import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    commentText: {
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

export default mongoose.model("user_comments", PostSchema);
