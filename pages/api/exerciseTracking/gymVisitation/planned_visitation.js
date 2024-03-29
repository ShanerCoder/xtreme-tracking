import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import PlannedVisitation from "../../../../models/visitation/plannedVisitationDates";
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

      const { username, dateOfPlannedVisitation } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      let plannedVisitationResult;
      // Checks if user was planning to visit this date
      const visitationAlreadyExists = await PlannedVisitation.find({
        username: username,
        dateOfPlannedVisitation: dateOfPlannedVisitation,
      });
      if (visitationAlreadyExists.length) {
        // Removes planned visitation if user was planning to go
        plannedVisitationResult = await PlannedVisitation.remove({
          username: username,
          dateOfPlannedVisitation: dateOfPlannedVisitation,
        });
      } else {
        // Adds planned visitation if user was not planning to go
        const plannedVisitation = new PlannedVisitation({
          username,
          dateOfPlannedVisitation,
        });
        plannedVisitationResult = await plannedVisitation.save();
      }

      if (plannedVisitationResult) {
        responseHandler(plannedVisitationResult, res, 201);
      } else {
        errorHandler("Updating Visitation Status Failed", res);
      }
    } catch (error) {
      errorHandler(
        "An error has occurred updating the Gym Visitation Status. Please try again later!",
        res
      );
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
