import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import bcrypt from "bcrypt";
import User from "../../../../models/user";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await getSession({ req });
      if (!session) {
        errorHandler("Session does not exist", res);
        return null;
      } else if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      validateAllFields(req.body);
      await dbConnect();

      const userResult = await User.findOne({ username: req.body.username });

      const passwordMatches = await bcrypt.compare(
        req.body.currentPassword,
        userResult.password
      );
      if (!passwordMatches) {
        errorHandler("Current Password does not match", res);
        return null;
      }

      const hashPassword = await bcrypt.hash(req.body.newPassword, 8);

      const passwordUpdated = await userResult.updateOne({
        password: hashPassword,
      });

      if (!passwordUpdated) errorHandler("Password failed to be updated", res);
      else responseHandler("Password Successfully Changed!", res, 200);
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
