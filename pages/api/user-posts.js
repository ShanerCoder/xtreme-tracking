import { MongoClient } from "mongodb";
import { dbConnect } from "../../lib/db-connect";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await dbConnect();

    const db = client.db();

    const meetupsCollection = db.collection("user-posts");

    const result = await meetupsCollection.insertOne({
      postText: data.postText,
      dateAdded: Date(),
    });

    //try catch to error handle if you wish

    res.status(201).json({ message: "Post inserted" });
  }
}

export default handler;
