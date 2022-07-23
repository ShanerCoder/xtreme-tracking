import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import CheckIn from "../../../../models/visitation/checkInList";
import PlannedVisitationDates from "../../../../models/visitation/plannedVisitationDates";
import GymVisitationStreak from "../../../../models/visitation/gymVisitationStreak";
import { getSession } from "next-auth/client";
import { endOfDay, startOfDay } from "date-fns";

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

      const { username, dateOfCheckIn, photoId } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      let checkIn;
      const weight = req.body.weight;
      // Adds weight if it exists into new CheckIn, otherwise does not
      // New CheckIn is Created
      if (weight)
        checkIn = new CheckIn({
          username,
          dateOfCheckIn,
          photoId,
          weight,
        });
      else
        checkIn = new CheckIn({
          username,
          dateOfCheckIn,
          photoId,
        });

      // CheckIn is saved
      const checkInResult = await checkIn.save();

      // Checks if the user planned to visit this day
      const plannedVisitation = await PlannedVisitationDates.find({
        username: username,
        dateOfPlannedVisitation: {
          $gte: startOfDay(new Date(dateOfCheckIn)),
          $lte: endOfDay(new Date(dateOfCheckIn)),
        },
      });

      // Increment Gym Visitation Streak if user planned to visit this day
      if (plannedVisitation.length) {
        const gymVisitationUserExists = await GymVisitationStreak.findOne({
          username: username,
        });
        let visitationStreakResult;
        if (
          gymVisitationUserExists &&
          gymVisitationUserExists.streakCount > -1
        ) {
          // Updating streak by 1
          visitationStreakResult = await GymVisitationStreak.updateOne(
            { username: username },
            { streakCount: gymVisitationUserExists.streakCount + 1 }
          );
        }

        // Creating a new Streak Count Tracker
        else {
          const streakCount = 1;
          const visitationStreak = new GymVisitationStreak({
            username,
            streakCount,
          });

          visitationStreakResult = await visitationStreak.save();
        }
        if (visitationStreakResult && checkInResult) {
          await PlannedVisitationDates.deleteMany({
            username: username,
            dateOfPlannedVisitation: {
              $lte: endOfDay(new Date(dateOfCheckIn)),
            },
          });
          responseHandler(visitationStreakResult, res, 201);
        } else if (checkInResult) {
          errorHandler("Visitation Streak Failed to update", res);
        } else {
          errorHandler("Check In Failed", res);
        }
      } else {
        if (checkInResult) {
          // Removes any planned visitations from current date or before
          await PlannedVisitationDates.deleteMany({
            username: username,
            dateOfPlannedVisitation: {
              $lte: endOfDay(new Date(dateOfCheckIn)),
            },
          });
          responseHandler(checkInResult, res, 201);
        } else {
          errorHandler("Check In Failed", res);
        }
      }
    } catch (error) {
      errorHandler("An error has occurred. Please try again later!", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
