import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import Post from "../../models/post";

async function handler(req, res) {
  if (req.method === "POST") {
    validateAllFields(req.body);
    await dbConnect();

    const post = new Post(req.body);

    const result = await post.save();

    if (result) responseHandler(result, res, 201);
    else {
      errorHandler("Post failed to be created", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
