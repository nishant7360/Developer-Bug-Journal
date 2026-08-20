import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import asynHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const protect = asynHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized. Please login.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }
  req.user = user;
  next();
});
