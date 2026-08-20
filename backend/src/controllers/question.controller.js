import Question from "../models/question.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, errorMessage, code, technologies, tags } =
    req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const question = await Question.create({
    author: req.user._id,
    title,
    description,
    errorMessage,
    code,
    technologies,
    tags,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, question, "Question created successfully"));
});

export const getAllQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("author", "username profileImage")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { result: questions.length, questions },
        "Questions fetched successfully",
      ),
    );
});

export const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id).populate(
    "author",
    "username profileImage",
  );

  if (!question) {
    throw new ApiError(404, "No question found");
  }

  question.views += 1;

  await question.save();

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question fetched successfully"));
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (question.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this question");
  }

  const { title, description, errorMessage, code, technologies, tags } =
    req.body;
  question.title = title ?? question.title;
  question.description = description ?? question.description;
  question.errorMessage = errorMessage ?? question.errorMessage;
  question.code = code ?? question.code;
  question.technologies = technologies ?? question.technologies;
  question.tags = tags ?? question.tags;

  await question.save();

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question updated successfully"));
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (question.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this question");
  }

  await question.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Question deleted successfully"));
});
