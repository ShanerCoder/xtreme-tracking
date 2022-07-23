import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import FoodList from "../../../models/calorieTracking/foodList";
import FoodHistory from "../../../models/calorieTracking/foodHistory";
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
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const { username, foodName, gramsEaten, dateEaten } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // Finds food item
      const foodDetails = await FoodList.findOne({
        username: username,
        foodName: foodName,
      });

      // Calculates total calories for the food eaten
      const totalCalories = Math.round(
        foodDetails.caloriesPer100 * (gramsEaten / 100)
      );

      // Creates new food listing
      const food = new FoodHistory({
        username,
        foodName,
        gramsEaten,
        totalCalories,
        dateEaten,
      });

      // Saves new food listing
      const foodResult = await food.save();
      if (foodResult) {
        responseHandler(foodResult, res, 201);
      } else {
        errorHandler("Food Failed to be added to history", res);
      }
    } catch (error) {
      errorHandler("An error has occurred adding this food to history", res);
    }
  } else if (req.method === "DELETE") {
    // Delete Request
    try {
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();

      // Removes food entry
      const deleteFoodResult = await FoodHistory.deleteOne({
        _id: req.body.foodRecordId,
        username: session.user.username,
      });
      if (deleteFoodResult) responseHandler(deleteFoodResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Food", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
