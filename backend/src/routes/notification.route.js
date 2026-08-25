import express from "express";
import {
  getAllNotification,
  markRead,
} from "../controllers/notification.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllNotification);

router.patch("/:notificationId", protect, markRead);

export default router;
