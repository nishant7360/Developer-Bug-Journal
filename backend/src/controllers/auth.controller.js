import crypto from "crypto";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const user = await User.create({ username, email, password });

  const token = generateToken(user._id);

  const registeredUser = await User.findById(user._id);

  res.cookie("token", token, cookieOptions);

  return res
    .status(201)
    .json(new ApiResponse(201, registeredUser, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged in successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profileImage: req.user.profileImage,
        bio: req.user.bio,
      },
      "User info fetched successfully",
    ),
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const isPasswordSame = await user.isPasswordSame(newPassword);

  if (isPasswordSame) {
    throw new ApiError(
      400,
      "New password must be different from current password",
    );
  }
  user.password = newPassword;

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.find({ email: email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your Developer Bug Journal password",
    html: `
      <div>
        <h2>Password Reset</h2>

        <p>Hello ${user.username},</p>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:10px 20px;
            background:#007bff;
            color:white;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore
          this email.
        </p>
      </div>
    `,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

export const resetPassowrd = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token");
  }

  user.password = newPassword;

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});
