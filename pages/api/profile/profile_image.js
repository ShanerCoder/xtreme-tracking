import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import UserProfile from "../../../models/userProfile";
import User from "../../../models/user";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      validateAllFields(req.query.username);
      await dbConnect();
      const user = await User.findOne({ username: req.query.username });

      const userProfileResult = await UserProfile.findOne({
        _id: user._id,
      });

      if (userProfileResult) {
        var profilePictureId = userProfileResult.profilePictureId;
        if (
          profilePictureId == null ||
          profilePictureId == undefined ||
          profilePictureId == ""
        )
          profilePictureId = process.env.DEFAULT_PROFILE_PICTURE_ID;
        responseHandler(profilePictureId, res, 200);
      } else {
        errorHandler(process.env.DEFAULT_PROFILE_PICTURE_ID, res);
      }
    } catch (error) {
      console.log(error);
      errorHandler(process.env.DEFAULT_PROFILE_PICTURE_ID, res);
    }
  } else if (req.method === "PUT") {
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
        profilePictureId: req.body.profilePictureId,
      });

      if (userProfileResult) {
        responseHandler(userProfileResult, res, 201);
      } else {
        errorHandler("Image Id Failed to Update", res);
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
