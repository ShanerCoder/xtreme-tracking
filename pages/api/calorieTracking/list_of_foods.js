import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import { getSession } from "next-auth/client";
import FoodList from "../../../models/calorieTracking/foodList";

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

      const { username, foodName, caloriesPer100 } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // Checks if Food already exists by the user
      const foodAlreadyExistsByUser = await FoodList.find({
        username: username,
        foodName: foodName,
      });

      if (foodAlreadyExistsByUser.length) {
        errorHandler("Food Item already exists!", res);
        return null;
      }

      // Creates new Food Item
      const food = new FoodList({
        username,
        foodName,
        caloriesPer100,
      });

      // Saves new Food Item
      const foodResult = await food.save();
      if (foodResult) {
        responseHandler(foodResult, res, 201);
      } else {
        errorHandler("Food Item Failed to be created", res);
      }
    } catch (error) {
      errorHandler("An error has occurred creating this food item", res);
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

      // Removes Food Item
      const deleteFoodResult = await FoodList.deleteOne({
        foodName: req.body.foodName,
        username: session.user.username,
      });
      if (deleteFoodResult) responseHandler(deleteFoodResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Food Item", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
