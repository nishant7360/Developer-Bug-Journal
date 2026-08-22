import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    questionCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
