import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import UserProfile from "../../../../models/accountProfile/userProfile";
import User from "../../../../models/account/user";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      validateAllFields(req.query.username);
      await dbConnect();
      const usernameFilter = { username: req.query.username };
      const user = await User.findOne(usernameFilter);

      if (user && session && req.query.username == session.user.username) {
        const streakCount = user.streakCount;
        const streakDate = user.streakDate;
        let dateFormat = new Date().setHours(1, 0, 0, 0);
        let todayDate = new Date(dateFormat);
        let yesterdayDate = new Date(dateFormat);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);

        // Checks if streak should be incremented
        if (
          streakDate &&
          streakCount > -1 &&
          new Date(streakDate).toDateString() === yesterdayDate.toDateString()
        ) {
          console.log("Incrementing Streak");
          await User.findOneAndUpdate(usernameFilter, {
            streakCount: streakCount + 1,
            streakDate: todayDate,
          });
        }
        // Checks if streak exists or if the streak has broken
        else if (
          streakCount == undefined ||
          streakDate == undefined ||
          (streakDate &&
            new Date(streakDate).toDateString() != todayDate.toDateString())
        ) {
          console.log("Resetting Streak");
          await User.findOneAndUpdate(usernameFilter, {
            streakCount: 0,
            streakDate: todayDate,
          });
        }
      }

      const userProfileResult = await UserProfile.findOne({
        _id: user._id,
      });

      if (userProfileResult == null) {
        errorHandler(process.env.DEFAULT_PROFILE_PICTURE_ID, res);
        return null;
      }

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
