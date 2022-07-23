import mongoose from "mongoose";

// Global variable to reuse the connection if it has been already created 
global.mongoose = {
  conn: null,
  promise: null,
};

// Function to create a connection to the database
export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  } else {
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
