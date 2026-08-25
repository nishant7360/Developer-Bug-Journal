import Answer from "../models/answer.models.js";
import Notification from "../models/notification.model.js";
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

  if (question.author.toString() !== req.user._id.toString()) {
    await Notification.create({
      recipient: question.author,
      sender: req.user._id,
      type: "answer",
      question: question._id,
      answer: answer._id,
      message: `${req.user.username} answered your question`,
      isRead: false,
    });
  }
  question.answeresCount += 1;
  await question.save();

  const populatedAnswer = await Answer.findById(answer._id).populate(
    "author",
    "username profileImage",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedAnswer, "Answer posted successfully"));
});

export const getAnswerByQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  const answers = await Answer.find({ question: questionId })
    .populate("author", "username profileImage")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, answers, "Answers fetched successfully"));
});

export const updateAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Answer content is required");
  }

  const answer = await Answer.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  if (answer.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this answer");
  }

  answer.content = content;

  await answer.save();

  return res
    .status(200)
    .json(new ApiResponse(200, answer, "Answer updated successfully"));
});

export const deleteAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  if (answer.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this answer");
  }

  const question = await Question.findById(answer.question);

  await Answer.findByIdAndDelete(answerId);

  if (question) {
    question.answeresCount = Math.max(0, question.answeresCount - 1);

    if (answer.status === "accepted") {
      const acceptedAnswers = await Answer.countDocuments({
        question: question._id,
        status: "accepted",
      });

      if (acceptedAnswers === 0) {
        question.isSolved = false;
      }
    }

    await question.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Answer deleted successfully"));
});

export const acceptAnswer = asyncHandler(async (req, res) => {
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  const question = await Question.findById(answer.question);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (question.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the question author can accept an answer");
  }

  answer.status = "accepted";

  question.isSolved = true;

  await answer.save();
  await question.save();

  if (answer.author.toString() !== req.user._id.toString()) {
    await Notification.create({
      recipient: answer.author,
      sender: req.user._id,
      type: "answerAccepted",
      question: question._id,
      answer: answer._id,
      message: `${req.user.username} accepted your answer`,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, answer, "Answer accepted successfully"));
});
