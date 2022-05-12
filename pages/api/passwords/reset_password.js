import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import bcrypt from "bcrypt";
import User from "../../models/user";
import Token from "../../models/token";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, queryToken } = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const token = await Token.findOne({ userId });

      const isValid = await bcrypt.compare(queryToken, token.token);
      if (!isValid) errorHandler("Token does not match", res);

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const userResult = await User.findOne({ _id: userId }).updateOne({
        password: hashPassword,
      });
      await Token.find({ userId: userId }).deleteMany();
      if (!userResult) errorHandler("Password failed to be updated", res);
      responseHandler("Password Successfully Changed!", res, 200);
    } catch (error) {
      console.log(error);
      errorHandler(
        "An error has occurred when updating this user account",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
