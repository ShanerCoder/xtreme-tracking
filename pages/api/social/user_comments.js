import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import PostComment from "../../../models/postComment";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      validateAllFields(req.body);
      await dbConnect();
      const session = await getSession({ req });
      if (!session) {
        errorHandler("Session does not exist", res);
        return null;
      } else if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      
      const comment = new PostComment(req.body);

      const result = await comment.save();

      if (result) responseHandler(result, res, 201);
      else {
        errorHandler("Comment failed to be created", res);
      }
    } catch (error) {
      errorHandler("Comment failed to be created", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
