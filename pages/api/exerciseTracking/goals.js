import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import Goal from "../../../models/goal";
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

      const goal = new Goal({
        username,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateToAchieveBy,
      });

      const goalResult = await goal.save();
      if (goalResult) {
        responseHandler(goalResult, res, 201);
      } else {
        errorHandler("Goal Failed to be created", res);
      }
    } catch (error) {
      console.log(error);
      errorHandler("An error has occurred creating this goal", res);
    }
  } else if (req.method === "DELETE") {
    try {
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();
      const deleteGoalResult = await Goal.deleteOne({
        _id: req.body.goalRecordId,
        username: session.user.username,
      });
      if (deleteGoalResult)
        responseHandler(deleteGoalResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Goal", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
