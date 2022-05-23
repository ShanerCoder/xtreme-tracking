import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    postText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("user_posts", PostSchema);
