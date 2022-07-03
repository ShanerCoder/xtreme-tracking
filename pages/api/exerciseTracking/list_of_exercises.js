import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import ExerciseList from "../../../models/exerciseTracking/exerciseList";
import CommonExerciseList from "../../../models/exerciseTracking/commonExerciseList";
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

      const { username, exerciseName, muscleGroup } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const exerciseAlreadyExistsByUser = await ExerciseList.find({
        username: username,
        exerciseName: exerciseName,
      });

      const exerciseAlreadyExistsByDefault = await CommonExerciseList.find({
        exerciseName: exerciseName,
      });

      if (
        exerciseAlreadyExistsByDefault.length ||
        exerciseAlreadyExistsByUser.length
      ) {
        errorHandler("Exercise already exists!", res);
        return null;
      }

      const exercise = new ExerciseList({
        username,
        exerciseName,
        muscleGroup,
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
      const deleteExerciseResult = await ExerciseList.deleteOne({
        exerciseName: req.body.exerciseName,
        username: session.user.username,
      });
      if (deleteExerciseResult) responseHandler(deleteExerciseResult, res, 200);
    } catch (error) {
      console.log(error);
      errorHandler("Failed to delete this Exercise", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
