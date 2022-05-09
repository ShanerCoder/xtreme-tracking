import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import bcrypt from "bcrypt";
import User from "../../models/user";
import UserProfile from "../../models/userProfile";

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
      const userResult = await user.save();
      if (userResult) {
        const userDoc = userResult._doc;
        delete userDoc.password;

        const profileId = userDoc._id;
        const profilePicture = null;
        const profileDescription = "This is a test description";
        const userProfile = new UserProfile({
          _id: profileId,
          profilePictureURL: profilePicture,
          profileDescription: profileDescription,
        });
        const profileResult = await userProfile.save();
        if (profileResult) {
          responseHandler(userResult, res, 201);
        } else errorHandler("User Created, Profile Failed to be created", res);
      } else {
        errorHandler("User failed to be created", res);
      }
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        errorHandler("This Username or Email is already in use!", res);
      } else {
        console.log(error);
        errorHandler("An error has occurred creating a user account", res);
      }
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
