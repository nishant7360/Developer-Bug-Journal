import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  getUserAnswers,
  getUserProfile,
  getUserQuestions,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, getUserProfile);

router.get("/my-questions", protect, getUserQuestions);
router.get("/my-answers", protect, getUserAnswers);

export default router;
