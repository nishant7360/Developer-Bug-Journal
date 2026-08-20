import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Question description is required"],
      trim: true,
    },
    errorMessage: {
      type: String,
      trim: true,
      default: "",
    },
    code: {
      type: String,
      default: "",
    },
    technologies: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    answeresCount: {
      type: Number,
      default: 0,
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    acceptedAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },
  },
  { timestamps: true },
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
