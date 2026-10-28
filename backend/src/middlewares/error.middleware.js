import ApiError from "../utils/ApiError.js";

const isProd = process.env.NODE_ENV === "production";

export const notFound = (req, _res, next) =>
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));

export const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode ?? 500;
  let message = err.message || "Internal server error";
  let errors = Array.isArray(err.errors) ? err.errors : [];

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = errors[0]?.message ?? "Validation failed";
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern ?? {})[0] ?? "value";
    message = `That ${field} is already in use`;
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Unauthorized. Please login.";
  } else if (err.name === "MulterError") {
    statusCode = 400;
    message =
      err.code === "LIMIT_FILE_SIZE" ? "Image must be under 5 MB" : err.message;
  } else if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Malformed JSON in request body";
  }

  if (statusCode >= 500) {
    console.error(err);
    if (isProd) message = "Internal server error";
  }

  res.status(statusCode).json({
    statusCode,
    data: null,
    message,
    success: false,
    errors,
    ...(!isProd && statusCode >= 500 && { stack: err.stack }),
  });
};
