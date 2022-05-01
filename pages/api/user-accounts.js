import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import bcrypt from "bcrypt";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, forename, surname } = req.body;
      validateAllFields(req.body);
      const client = await dbConnect();

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const db = client.db();

      const userAccounts = await db.collection("user-accounts");

      const result = await userAccounts.insertOne({
        username: username,
        password: hashPassword,
        email: email,
        forename: forename,
        surname: surname,
        //accountStreak: 0,
      });

      if (result) {
        responseHandler(result, res, 201);
      } else {
        errorHandler("User failed to be created", res);
      }
    } catch (exception) {
      errorHandler("An error has occurred creating a user account", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
