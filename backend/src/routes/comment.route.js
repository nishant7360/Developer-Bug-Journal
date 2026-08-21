import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createComment,
  getCommentByQuestion,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:questionId", protect, createComment);
router.get("/:questionId", protect, getCommentByQuestion);

router.patch("/:commentId", protect, updateComment);

export default router;
