import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  acceptAnswer,
  createAnswer,
  deleteAnswer,
  getAnswerByQuestion,
  updateAnswer,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/:questionId", protect, createAnswer);
router.get("/:questionId", getAnswerByQuestion);

router.patch("/:answerId", protect, updateAnswer);
router.patch("/:answerId/accept", protect, acceptAnswer);

router.delete("/:answerId", protect, deleteAnswer);

export default router;
