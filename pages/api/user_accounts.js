import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import bcrypt from "bcrypt";
import User from "../../models/user";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, forename, surname } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const user = new User({
        username,
        password: hashPassword,
        email,
        forename,
        surname,
      });
      const result = await user.save();
      if (result) {
        const userDoc = result._doc;
        delete userDoc.password;
        responseHandler(result, res, 201);
      } else {
        errorHandler("User failed to be created", res);
      }
    } catch (exception) {
      if (exception.name === "MongoServerError" && exception.code === 11000) {
        errorHandler("This Username or Email is already in use!", res);
      } else errorHandler("An error has occurred creating a user account", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
