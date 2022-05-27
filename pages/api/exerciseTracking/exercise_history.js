import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import ExerciseHistory from "../../../models/exerciseHistory";
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
        dateOfExercise,
      } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const exercise = new ExerciseHistory({
        username,
        exerciseName,
        weightUsed,
        numberOfReps,
        numberOfSets,
        dateOfExercise,
      });

      const exerciseResult = await exercise.save();
      if (exerciseResult) {
        responseHandler(exerciseResult, res, 201);
      } else {
        errorHandler("Exercise Failed to be created", res);
      }
    } catch (error) {
      console.log(error);
      errorHandler("An error has occurred creating this exercise", res);
    }
  } else if (req.method === "DELETE") {
    try {
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();
      const deleteExerciseResult = await ExerciseHistory.deleteOne({
        _id: req.body.exerciseId,
        username: session.user.username,
      });
      if (deleteExerciseResult) responseHandler(deleteMessageResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Exercise", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
