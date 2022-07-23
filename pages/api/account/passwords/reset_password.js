import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import bcrypt from "bcrypt";
import User from "../../../../models/account/user";
import Token from "../../../../models/account/token";

async function handler(req, res) {
  if (req.method === "PUT") {
    // Put Request
    try {
      const { userId, queryToken } = req.body;
      validateAllFields(req.body);
      await dbConnect();
      // Finds token for the user
      const token = await Token.findOne({ userId });

      // Checks token is valid
      const isValid = await bcrypt.compare(queryToken, token.token);
      if (!isValid) errorHandler("Token does not match", res);

      // Encrypts new user password
      const hashPassword = await bcrypt.hash(req.body.password, 8);

      // Saves new user password
      const userResult = await User.findOne({ _id: userId }).updateOne({
        password: hashPassword,
      });

      // Removes existing tokens for the user
      await Token.find({ userId: userId }).deleteMany();
      if (!userResult) errorHandler("Password failed to be updated", res);
      responseHandler("Password Successfully Changed!", res, 200);
    } catch (error) {
      errorHandler(
        "An error has occurred when updating this user account",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
