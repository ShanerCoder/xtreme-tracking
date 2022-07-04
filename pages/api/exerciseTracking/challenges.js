import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import Challenge from "../../../models/exerciseTracking/challenge";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "POST") {
    try {
      if (session.user.username != req.body.personalTrainerUsername) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      const {
        personalTrainerUsername,
        clientUsername,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateToAchieveBy,
      } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const challenge = new Challenge({
        personalTrainerUsername,
        clientUsername,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateToAchieveBy,
      });

      const challengeResult = await challenge.save();
      if (challengeResult) {
        responseHandler(challengeResult, res, 201);
      } else {
        errorHandler("Challenge Failed to be created", res);
      }
    } catch (error) {
      errorHandler("An error has occurred creating this challenge", res);
    }
  } else if (req.method === "DELETE") {
    try {
      if (session.user.username != req.body.clientUsername) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();
      const deleteChallengeResult = await Challenge.deleteOne({
        _id: req.body.challengeRecordId,
        clientUsername: session.user.username,
      });
      if (deleteChallengeResult)
        responseHandler(deleteChallengeResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Challenge", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
