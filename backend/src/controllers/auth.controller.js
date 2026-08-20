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
