import { MongoClient } from "mongodb";

global.databaseConnection = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.databaseConnection && global.databaseConnection.conn) {
    console.log("Using Existing MongoDB connection");
    return global.databaseConnection.conn;
  } else {
    console.log("Creating new MongoDB connection");

    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;

    const connectionString = `mongodb+srv://${user}:${password}@cluster0.vxyoc.mongodb.net/${database}?retryWrites=true&w=majority`;

    const promise = await MongoClient.connect(connectionString);

    global.databaseConnection = {
      conn: await promise,
      promise,
    };

    return await promise;
  }
}
