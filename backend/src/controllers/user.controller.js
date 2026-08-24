import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "username profileImage createdAt",
  );

  if (!user) {
    throw new ApiError(404, "*User not found");
  }

  const totalQuestions = await Question.countDocuments({ author: user._id });

  const totalAnswers = await Answer.countDocuments({ author: user._id });

  const solvedQuestions = await Question.countDocuments({
    author: user._id,
    isSolved: true,
  });

  const recentQuestions = await Question.find({ author: user._id })
    .populate("tags")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentAnswers = await Answer.find({ author: user._id })
    .populate("question")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        stats: {
          totalQuestions,
          totalAnswers,
          solvedQuestions,
        },
        recentQuestions,
        recentAnswers,
      },
      "User profile fetched successfully",
    ),
  );
});

export const getUserQuestions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNunber = Number(page);
  const limitNumber = Number(limit);

  if (!Number.isInteger(pageNunber) || pageNunber < 1) {
    throw new ApiError(400, "Page must be a positive integer");
  }

  if (!Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 50) {
    throw new ApiError(400, "Limit must be between 1 and 50");
  }

  const skip = (pageNunber - 1) * limitNumber;

  const totalQuestions = await Question.countDocuments({
    author: req.user._id,
  });

  const questions = await Question.find({
    author: req.user._id,
  })
    .populate("tags", "name description")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result: questions.length,
        totalQuestions,
        currentPage: pageNunber,
        totalPages: Math.ceil(totalQuestions / limitNumber),
        questions,
      },
      "Your questions fetched successfully",
    ),
  );
});

export const getUserAnswers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  
  if (!Number.isInteger(pageNumber) || page < 1) {
    throw new ApiError(400, "Page number must be integer");
  }

  if (!Number.isInteger(limitNumber) || limit < 1 || limit > 50) {
    throw new ApiError(400, "Limit must be between 1 and 50");
  }

  const skip = (pageNumber - 1) * limitNumber;

  const totalAnswers = await Answer.countDocuments({ author: req.user._id });

  const answers = await Answer.find({ author: req.user._id })
    .populate("question")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result: answers.length,
        totalAnswers,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAnswers / limitNumber),
        answers,
      },
      "Your answers fetched successfully",
    ),
  );
});
