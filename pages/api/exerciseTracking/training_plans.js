import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import TrainingPlan from "../../../models/trainingPlan";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (session.user.username != req.body.username) {
    errorHandler("Username does not match with Session", res);
    return null;
  }
  if (req.method === "POST") {
    try {
      const { username, trainingPlanName, listOfExercises } = req.body;
      validateAllFields(req.body);
      if (
        trainingPlanName.indexOf("/") > -1 ||
        trainingPlanName.indexOf("\\") > -1
      )
        throw `\\ or / cannot be in Training Plan Name`;
      await dbConnect();

      const trainingPlan = new TrainingPlan({
        username,
        trainingPlanName,
        listOfExercises,
      });

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
    try {
      await dbConnect();

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
    try {
      await dbConnect();
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
