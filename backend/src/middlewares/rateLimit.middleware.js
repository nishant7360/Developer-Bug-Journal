import rateLimit from "express-rate-limit";
import ApiError from "../utils/ApiError.js";

const make = ({ windowMs, limit, message, ...rest }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (req, res, next) => next(new ApiError(429, message)),
    ...rest,
  });

export const loginLimiter = make({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: "Too many login attempts. Try again in 15 minutes.",
});

export const registerLimiter = make({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Too many accounts created from this network. Try again later.",
});

export const forgotPasswordLimiter = make({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Too many reset requests. Try again in an hour.",
});

export const apiLimiter = make({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: "Too many requests. Slow down.",
});
