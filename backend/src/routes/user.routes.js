import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  getMyBookmarks,
  getUserAnswers,
  getUserProfile,
  getUserQuestions,
  handleBookMark,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.get("/my-questions", protect, getUserQuestions);
router.get("/my-answers", protect, getUserAnswers);
router.get("/bookmarks", protect, getMyBookmarks);

router.patch("/:questionId/bookmark", protect, handleBookMark);

export default router;
