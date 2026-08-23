import Tag from "../models/tag.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().sort({ questionCount: -1, name: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tags, "Tags fetched successfully"));
});
