import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { createAnswer } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/:questionId", protect, createAnswer);

export default router;
