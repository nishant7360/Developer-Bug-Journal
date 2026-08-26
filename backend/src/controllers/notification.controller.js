import Notification from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllNotification = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user._id,
  })
    .populate("sender", "username profileImage")
    .populate("question", "title")
    .populate("answer", "content")
    .sort({
      createdAt: -1,
    });

  return res
    .status(200)
    .json(
      new ApiResponse(200, notifications, "Notifications fetched successfully"),
    );
});

export const markRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (req.user._id.toString() !== notification.recipient.toString()) {
    throw new ApiError(403, "You are not allowed to read this notification");
  }

  notification.isRead = true;
  await notification.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Notification marked as read"));
});

export const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      recipient: req.user._id,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All notifications marked as read"));
});

export const getUnreadNotificationCount = asyncHandler(async (req, res) => {
  const unreadNotifications = await Notification.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { unreadNotifications },
        "Unread notification count fetched successfully",
      ),
    );
});
