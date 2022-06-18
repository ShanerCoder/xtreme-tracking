import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import CheckIn from "../../../../models/checkInList";
import PlannedVisitationDates from "../../../../models/plannedVisitationDates";
import GymVisitationStreak from "../../../../models/gymVisitationStreak";
import { getSession } from "next-auth/client";
import { endOfDay, startOfDay } from "date-fns";

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

      const { username, dateOfCheckIn, photoId } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      const checkIn = new CheckIn({
        username,
        dateOfCheckIn,
        photoId,
      });

      const checkInResult = await checkIn.save();
      const plannedVisitation = await PlannedVisitationDates.find({
        username: username,
        dateOfPlannedVisitation: {
          $gte: startOfDay(new Date(dateOfCheckIn)),
          $lte: endOfDay(new Date(dateOfCheckIn)),
        },
      });

      // Increment Gym Visitation Streak
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
