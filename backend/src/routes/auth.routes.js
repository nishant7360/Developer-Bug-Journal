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

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassowrd);
router.post("/change-password", protect, changePassword);

router.get("/me", protect, getCurrentUser);

export default router;
