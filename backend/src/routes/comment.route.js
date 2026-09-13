import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getCommentByQuestion,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:questionId", protect, createComment);
router.get("/:questionId", getCommentByQuestion);

router.patch("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
