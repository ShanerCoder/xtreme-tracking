/*import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import ExampleTrainingPlan from "../../../models/exerciseTracking/exampleTrainingPlan";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, trainingPlanName, listOfExercises } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const exampleTrainingPlan = new ExampleTrainingPlan({
        trainingPlanName,
        listOfExercises,
      });

      const exampleTrainingPlanResult = await exampleTrainingPlan.save();
      if (exampleTrainingPlanResult) {
        responseHandler(exampleTrainingPlanResult, res, 201);
      } else {
        errorHandler("Example Training Plan Failed to be created", res);
      }
    } catch (error) {
      errorHandler(
        "An error has occurred creating this Example Training Plan",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
*/
