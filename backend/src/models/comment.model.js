import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Comment needs to has content"],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
commentSchema.index({ question: 1, createdAt: -1 });
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
