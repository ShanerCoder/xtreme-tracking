import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostLikedBySchema = new mongoose.Schema({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  usernameLikingPost: {
    type: String,
    required: true,
    trim: true,
  },
});

mongoose.models = {};

export default mongoose.model("posts_liked", PostLikedBySchema);
