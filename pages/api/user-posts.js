import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";

async function handler(req, res) {
  if (req.method === "POST") {
    const { postText } = req.body;

    const client = await dbConnect();

    const db = client.db();

    const meetupsCollection = db.collection("user-posts");

    const result = await meetupsCollection.insertOne({
      postText: postText,
      dateAdded: Date(),
    });

    if (result) responseHandler(result, res, 201);
    else {
      errorHandler("User failed to be created", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
