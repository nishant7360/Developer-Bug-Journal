import ApiError from "../utils/ApiError.js";

const errrorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }

  console.error(error);
  console.error(error.stack);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default errrorHandler;
