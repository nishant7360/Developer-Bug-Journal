import Question from "../models/question.model.js";
import Tag from "../models/tag.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, errorMessage, code, technologies, tags } =
    req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  if (!Array.isArray(tags)) {
    throw new ApiError(400, "Tags must be an array");
  }

  if (tags.length > 5) {
    throw new ApiError(400, "A question can have a maximum of 5 tags");
  }

  const uniqueTags = [...new Set(tags)];

  const validTags = await Tag.find({
    _id: {
      $in: uniqueTags,
    },
  });

  if (validTags.length !== uniqueTags.length) {
    throw new ApiError(400, "One or more selected tags are invalid");
  }

  const question = await Question.create({
    author: req.user._id,
    title,
    description,
    errorMessage,
    code,
    technologies,
    tags: uniqueTags,
  });

  await Tag.updateMany(
    {
      _id: {
        $in: uniqueTags,
      },
    },
    {
      $inc: {
        questionCount: 1,
      },
    },
  );

  return res
    .status(201)
    .json(new ApiResponse(201, question, "Question created successfully"));
});

export const getAllQuestion = asyncHandler(async (req, res) => {
  const {
    search,
    technology,
    tag,
    status,
    sort = "newest",
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { errorMessage: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
    ];
  }

  if (technology) {
    filter.technologies = {
      $regex: technology,
      $options: "i",
    };
  }

  if (tag) {
    filter.tags = tag;
  }

  if (status) {
    if (status === "solved") {
      filter.isSolved = true;
    } else if (status === "unsolved") {
      filter.isSolved = false;
    } else {
      throw new ApiError(400, "Status must be either solved or unsolved");
    }
  }

  let sortOption = { createdAt: -1 };

  if (sort === "oldest") {
    sortOption = { createdAt: 1 };
  } else if (sort === "mostViewed") {sortOption = { views: -1 };
  } else if (sort !== "newest") {
    throw new ApiError(400, "Sort must be newest, oldest, or mostViewed");
  }

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.min(Math.max(Number(limit), 1), 50);

  const skip = (pageNumber - 1) * limitNumber;

  const totalQuestions = await Question.countDocuments(filter);

  const questions = await Question.find(filter)
    .populate("author", "username profileImage")
    .populate("tags", "name description")
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  const totalPages = Math.ceil(totalQuestions / limitNumber);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result: questions.length,
        totalQuestions,
        currentPage: pageNumber,
        totalPages,
        questions,
      },
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

  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      throw new ApiError(400, "Tags must be an array");
    }

    if (tags.length === 0) {
      throw new ApiError(400, "Select at least one tag");
    }

    if (tags.length > 5) {
      throw new ApiError(400, "A question can have a maximum of 5 tags");
    }

    const uniqueTags = [...new Set(tags)];

    const validTags = await Tag.find({
      _id: {
        $in: uniqueTags,
      },
    });

    if (validTags.length !== uniqueTags.length) {
      throw new ApiError(400, "One or more selected tags are invalid");
    }

    const oldTags = question.tags.map((tag) => tag.toString());

    const tagsToRemove = oldTags.filter((tagId) => !uniqueTags.includes(tagId));

    const tagsToAdd = uniqueTags.filter((tagId) => !oldTags.includes(tagId));

    if (tagsToRemove.length > 0) {
      await Tag.updateMany(
        {
          _id: {
            $in: tagsToRemove,
          },
        },
        {
          $inc: {
            questionCount: -1,
          },
        },
      );
    }

    if (tagsToAdd.length > 0) {
      await Tag.updateMany(
        {
          _id: {
            $in: tagsToAdd,
          },
        },
        {
          $inc: {
            questionCount: 1,
          },
        },
      );
    }

    question.tags = uniqueTags;
  }

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

  if (question.tags.length > 0) {
    await Tag.updateMany(
      {
        _id: {
          $in: question.tags,
        },
      },
      {
        $inc: {
          questionCount: -1,
        },
      },
    );
  }

  await question.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Question deleted successfully"));
});
