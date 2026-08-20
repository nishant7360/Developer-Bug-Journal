import Answer from "../models/answer.models.js";
import Question from "../models/question.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createAnswer = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Answer content is required");
  }

  const question = await Question.findById(questionId);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  const answer = await Answer.create({
    question: questionId,
    author: req.user._id,
    content: content,
    status: "pending",
  });

  question.answeresCount += 1;
  await question.save();

  const populatedAnswer = await Answer.findById(answer._id).populate(
    "author",
    "username profileImage",
  );
  -console.log(populatedAnswer);
  return res
    .status(201)
    .json(new ApiResponse(201, populatedAnswer, "Answer posted successfully"));
});
