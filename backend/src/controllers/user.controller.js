import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select(
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
});
