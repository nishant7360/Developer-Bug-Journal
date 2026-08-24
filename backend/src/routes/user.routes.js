import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:username", protect, getUserProfile);

export default router;
