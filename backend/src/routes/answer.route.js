import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  createAnswer,
  deleteAnswer,
  getAnswerByQuestion,
  updataeAnswer,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/:questionId", protect, createAnswer);
router.get("/:questionId", getAnswerByQuestion);

router.patch("/:answerId", protect, updataeAnswer);
router.delete("/:answerId", protect, deleteAnswer);

export default router;
