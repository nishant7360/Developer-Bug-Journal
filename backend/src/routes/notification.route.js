import express from "express";
import {
  getAllNotification,
  getUnreadNotificationCount,
  markAllRead,
  markRead,
} from "../controllers/notification.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllNotification);
router.get("/unread-count", protect, getUnreadNotificationCount);

router.patch("/read-all", protect, markAllRead);
router.patch("/:notificationId", protect, markRead);

export default router;
