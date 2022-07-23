import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import TrainingPlan from "../../../models/exerciseTracking/trainingPlan";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  // Session Check
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  // Username Session Check
  if (session.user.username != req.body.username) {
    errorHandler("Username does not match with Session", res);
    return null;
  }
  if (req.method === "POST") {
    // Post Request
    try {
      const { username, trainingPlanName, listOfExercises } = req.body;
      validateAllFields(req.body);

      // Checks there are no slashes in the name
      if (
        trainingPlanName.indexOf("/") > -1 ||
        trainingPlanName.indexOf("\\") > -1
      )
        throw `\\ or / cannot be in Training Plan Name`;
      await dbConnect();

      // New Training Plan Created
      const trainingPlan = new TrainingPlan({
        username,
        trainingPlanName,
        listOfExercises,
      });

      //New Training Plan Saved
      const trainingPlanResult = await trainingPlan.save();
      if (trainingPlanResult) {
        responseHandler(trainingPlanResult, res, 201);
      } else {
        errorHandler("Training Plan Failed to be created", res);
      }
    } catch (error) {
      if (error === "\\ or / cannot be in Training Plan Name") {
        errorHandler("\\ or / cannot be contained in Training Plan Name", res);
      } else
        errorHandler("An error has occurred creating this Training Plan", res);
    }
  } else if (req.method === "PUT") {
    // Put Request
    try {
      await dbConnect();

      // Updates Training Plan
      const updateTrainingPlanResult = await TrainingPlan.findById(
        req.body.id
      ).updateOne({
        listOfExercises: req.body.listOfExercises,
      });

      if (updateTrainingPlanResult)
        responseHandler(updateTrainingPlanResult, res, 200);
    } catch (error) {
      errorHandler("Failed to update this Training Plan", res);
    }
  } else if (req.method === "DELETE") {
    // Delete Request
    try {
      await dbConnect();
      // Removes Training Plan
      const deleteTrainingPlanResult = await TrainingPlan.deleteOne({
        _id: req.body.trainingPlanId,
        username: session.user.username,
      });
      if (deleteTrainingPlanResult)
        responseHandler(deleteTrainingPlanResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Training Plan", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
