import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import PostLiked from "../../../models/social/postLikedBy";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";

async function handler(req, res) {
  // Session Check
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  } else if (session.user.username != req.body.usernameLikingPost) {
    errorHandler("Username does not match with Session", res);
    return null;
  }

  if (req.method === "POST") {
    // Post Request
    try {
      validateAllFields(req.body);
      await dbConnect();

      // New Liked Post
      const likedPost = new PostLiked(req.body);

      // Saves new Liked Post
      const result = await likedPost.save();
      if (result) responseHandler(result, res, 201);
      else {
        errorHandler("Post failed to be liked", res);
      }
    } catch (error) {
      errorHandler("Post failed to be liked", res);
    }
  } else if (req.method === "DELETE") {
    // Delete Request
    try {
      validateAllFields(req.body);
      await dbConnect();

      // Removes the liked post from the user
      const result = await PostLiked.deleteMany({
        postId: mongoose.Types.ObjectId(req.body.postId),
        usernameLikingPost: session.user.username,
      });

      if (result) responseHandler(result, res, 201);
      else {
        errorHandler("Post failed to be unliked", res);
      }
    } catch (error) {
      errorHandler("Post failed to be unliked", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
