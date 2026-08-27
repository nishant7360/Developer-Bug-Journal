import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
    profileImagePublicId: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
