import mongoose from "mongoose";
import { Post } from "../post";

function getPosts() {
  let posts;
  try {
    posts = mongoose.model("user_posts");
  } catch (error) {
    posts = new Post();
  }

  return posts;
}

export default getPosts;
