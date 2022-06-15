import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import CheckIn from "../../../models/checkInList";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "POST") {
    try {
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const { username, dateOfCheckIn, photoId } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const checkIn = new CheckIn({
        username,
        dateOfCheckIn,
        photoId,
      });

      const checkInResult = await checkIn.save();
      if (checkInResult) {
        responseHandler(checkInResult, res, 201);
      } else {
        errorHandler("Check In Failed", res);
      }
    } catch (error) {
      console.log(error);
      errorHandler("An error has occurred Checking In. Please try again later!", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
