const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next ?? (() => {}));
    } catch (err) {
      console.error("asyncHandler catch", err);
      if (typeof next === "function") {
        return next(err);
      }

      console.error(err);
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
  };
};

export default asyncHandler;
