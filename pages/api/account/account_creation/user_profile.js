import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import User from "../../../../models/account/user";
import UserProfile from "../../../../models/accountProfile/userProfile";

async function handler(req, res) {
  if (req.method === "POST") {
    // Post Request
    try {
      validateAllFields(req.body);
      await dbConnect();

      // Attempts to find user
      const selectedUser = await User.findOne({ username: req.body.username });
      if (selectedUser) {
        const userProfile = new UserProfile({
          _id: selectedUser._id,
          profilePictureId: null,
          profileDescription: null,
          personalTrainerProfile: req.body.personalTrainerProfile,
          hideWeightOnCheckIn: false,
        });

        // Saves new user profile
        const profileResult = await userProfile.save();
        if (profileResult) {
          responseHandler(profileResult, res, 201);
        } else errorHandler("Profile failed to be created", res);
      } else {
        errorHandler("User does not exist", res);
      }
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        errorHandler("This ID already has a profile!", res);
      } else {
        errorHandler("An error has occurred creating the user profile", res);
      }
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
