/*import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import CommonExerciseList from "../../../models/commonExerciseList";

async function handler(req, res) {
  if (req.method === "POST") {
    const { exerciseName, muscleGroup } = req.body;
    validateAllFields(req.body);
    await dbConnect();

    const exercise = new CommonExerciseList({
      exerciseName,
      muscleGroup,
    });

    const exerciseResult = await exercise.save();
    if (exerciseResult) {
      responseHandler(exerciseResult, res, 201);
    } else {
      errorHandler("Exercise Failed to be created", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
*/
