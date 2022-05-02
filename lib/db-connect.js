import { MongoClient } from "mongodb";
import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Using Existing Mongoose connection");
    return global.mongoose.conn;
  } else {
    console.log("Creating new Mongoose connection");
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;

    const connectionString = `mongodb+srv://${user}:${password}@cluster0.vxyoc.mongodb.net/${database}?retryWrites=true&w=majority`;

    const promise = await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then((mongoose) => mongoose);

    global.mongoose = {
      conn: await promise,
      promise,
    };

    return await promise;
  }
}
