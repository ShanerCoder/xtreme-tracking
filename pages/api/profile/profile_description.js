import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import UserProfile from "../../../models/userProfile";
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

      const userProfileResult = await UserProfile.findOne({
        _id: session.user.id,
      }).updateOne({
        profileDescription: req.body.profileDescription,
      });

      if (userProfileResult) {
        responseHandler(userProfileResult, res, 201);
      } else {
        errorHandler("Description Failed to Update", res);
      }
    } catch (error) {
      console.log(error);
      errorHandler(
        "An error has occurred when updating the profile description",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
