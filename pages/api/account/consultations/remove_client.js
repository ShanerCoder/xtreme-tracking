import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import ClientList from "../../../../models/personalTrainer/clientList";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  // Session Check
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "DELETE") {
    // Delete Request
    try {
      if (session.user.username != req.body.personalTrainerUsername) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const { personalTrainerUsername, clientUsername } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // Client List Entry is removed
      const clientListRemovalResult = await ClientList.deleteOne({
        personalTrainerUsername: personalTrainerUsername,
        clientUsername: clientUsername,
      });

      if (clientListRemovalResult) {
        responseHandler(clientListRemovalResult, res, 200);
      } else {
        errorHandler("Client Failed to be removed", res);
      }
    } catch (error) {
      errorHandler("An error has occurred removing this client", res);
    }
  }
}

export default handler;
