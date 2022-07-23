import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import User from "../../../../models/account/user";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "PUT") {
    // Put Request
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

      // Finds User
      const userResult = await User.findOne({ username: req.body.username });

      // Checks email matches current address
      const emailMatches = userResult.email == req.body.currentEmail;

      if (!emailMatches) {
        errorHandler("Current Email does not match", res);
        return null;
      }

      // Checks email is not already in use
      const emailAlreadyInUse = await User.findOne({
        email: req.body.newEmail,
      });
      if (emailAlreadyInUse) {
        errorHandler("Current Email already in use", res);
        return null;
      }

      // Updates email to new entry
      const emailUpdated = await userResult.updateOne({
        email: req.body.newEmail,
      });

      if (!emailUpdated) errorHandler("Email failed to be updated", res);
      else responseHandler("Email Successfully Changed!", res, 200);
    } catch (error) {
      errorHandler(
        "An error has occurred when updating this user account",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
