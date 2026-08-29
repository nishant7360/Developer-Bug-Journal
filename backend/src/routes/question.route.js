import express from "express";

import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestion,
  updateQuestion,
} from "../controllers/question.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createQuestion);
router.get("/", getAllQuestion);
router.get("/:id", getQuestion);
router.patch("/:id", protect, upload.single("image"), updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;
