import express from "express";
import {
  changePassword,
  forgetPassword,
  getCurrentUser,
  login,
  logout,
  register,
  resetPassowrd,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  forgotPasswordLimiter,
  loginLimiter,
  registerLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordLimiter, forgetPassword);
router.patch("/reset-password/:token", resetPassowrd);
router.post("/change-password", protect, changePassword);

router.get("/me", protect, getCurrentUser);

export default router;
