import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
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

      const emailMatches = userResult.email == req.body.currentEmail;

      if (!emailMatches) {
        errorHandler("Current Email does not match", res);
        return null;
      }

      const emailUpdated = await userResult.updateOne({
        email: req.body.newEmail,
      });

      if (!emailUpdated) errorHandler("Email failed to be updated", res);
      else responseHandler("Email Successfully Changed!", res, 200);
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