import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import { getSession } from "next-auth/client";
import ConsultationList from "../../../../models/personalTrainer/consultationLists";

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
      if (session.user.username != req.body.personalTrainerUsername) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const {
        clientUsername,
        personalTrainerUsername,
        datetimeOfConsultation,
      } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // New Consultation Created
      const consultation = new ConsultationList({
        personalTrainerUsername,
        clientUsername,
        datetimeOfConsultation,
      });

      // Consultation Saved
      const consultationResult = await consultation.save();
      if (consultationResult) {
        responseHandler(consultationResult, res, 201);
      } else {
        errorHandler("Consultation Failed to be created", res);
      }
    } catch (error) {
      errorHandler("An error has occurred creating this Consultation", res);
    }
  } else if (req.method === "DELETE") {
    // Delete Request
    try {
      if (session.user.username != req.body.personalTrainerUsername) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();

      // Consultation entry is removed
      const deleteConsultation = await ConsultationList.deleteOne({
        _id: req.body.consultationId,
        personalTrainerUsername: session.user.username,
      });
      if (deleteConsultation) responseHandler(deleteConsultation, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Consultation", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
