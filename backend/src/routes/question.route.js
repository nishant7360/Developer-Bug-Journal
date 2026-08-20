import express from "express";

import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestion,
  updateQuestion,
} from "../controllers/question.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createQuestion);
router.get("/", getAllQuestion);
router.get("/:id", getQuestion);
router.patch("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;
