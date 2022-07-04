import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import Cryptr from "cryptr";
import { getSession } from "next-auth/client";
import ConsultationRequest from "../../../../models/personalTrainer/consultationRequest";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "POST") {
    try {
      if (session.user.username != req.body.usernameWhoSent) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const { usernameToReceive, usernameWhoSent } = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const encryptedConsultationRequest = await cryptr.encrypt(
        req.body.consultationRequest
      );

      const consultationRequest = new ConsultationRequest({
        usernameToReceive,
        usernameWhoSent,
        consultationRequest: encryptedConsultationRequest,
      });

      const consultationRequestResult = await consultationRequest.save();
      if (consultationRequestResult) {
        const ConsultationRequestDoc = consultationRequestResult._doc;
        delete ConsultationRequestDoc.consultationRequest;
        responseHandler(consultationRequestResult, res, 201);
      } else {
        errorHandler("Consultation Request Failed to be created", res);
      }
    } catch (error) {
      errorHandler(
        "An error has occurred creating this Consultation Request",
        res
      );
    }
  } else if (req.method === "DELETE") {
    try {
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();
      const deleteConsultationRequest = await ConsultationRequest.deleteOne({
        _id: req.body.consultationRequestId,
        usernameToReceive: session.user.username,
      });
      if (deleteConsultationRequest)
        responseHandler(deleteConsultationRequest, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Consultation Request", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
