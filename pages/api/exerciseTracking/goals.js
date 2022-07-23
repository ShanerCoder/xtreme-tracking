import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import Goal from "../../../models/exerciseTracking/goal";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  // Session Check
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "POST") {
    // Post Request
    try {
      // Username Session Check
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      const {
        username,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateToAchieveBy,
      } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // New Goal Created
      const goal = new Goal({
        username,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateToAchieveBy,
      });

      // New Goal Saved
      const goalResult = await goal.save();
      if (goalResult) {
        responseHandler(goalResult, res, 201);
      } else {
        errorHandler("Goal Failed to be created", res);
      }
    } catch (error) {
      errorHandler("An error has occurred creating this goal", res);
    }
  } else if (req.method === "DELETE") {
    // Delete Request
    try {
      // Username Session Check
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();

      // Goal Entry Removed
      const deleteGoalResult = await Goal.deleteOne({
        _id: req.body.goalRecordId,
        username: session.user.username,
      });
      if (deleteGoalResult) responseHandler(deleteGoalResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Goal", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
