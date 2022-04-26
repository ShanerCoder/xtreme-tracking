import { MongoClient, Timestamp } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://shaner:X1FFY8qVQ5yYi3AE@cluster0.vxyoc.mongodb.net/user-posts?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("user-posts");

    const result = await meetupsCollection.insertOne({
      postText: data.postText,
      dateAdded: Date(),
    });

    //try catch to error handle if you wish

    client.close();

    res.status(201).json({ message: "Post inserted" });
  }
}

export default handler;
