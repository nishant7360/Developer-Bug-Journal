import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  getMyBookmarks,
  getUserAnswers,
  getUserProfile,
  getUserQuestions,
  handleBookMark,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.get("/my-questions", protect, getUserQuestions);
router.get("/my-answers", protect, getUserAnswers);
router.get("/bookmarks", protect, getMyBookmarks);

router.patch("/:questionId/bookmark", protect, handleBookMark);
router.patch(
  "/update-profile",
  protect,
  upload.single("profileImage"),
  updateProfile,
);

export default router;
