import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

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

PostSchema.plugin(mongoosePaginate);

mongoose.models = {};

export default mongoose.model("user_posts", PostSchema);
