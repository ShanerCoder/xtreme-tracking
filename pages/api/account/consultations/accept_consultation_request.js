import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import PrivateMessage from "../../../../models/accountProfile/privateMessage";
import ClientList from "../../../../models/personalTrainer/clientList";
import Cryptr from "cryptr";
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
      if (session.user.username != req.body.usernameWhoSent) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const { usernameToReceive, usernameWhoSent } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // New Client List Entry
      const clientListEntry = new ClientList({
        personalTrainerUsername: usernameWhoSent,
        clientUsername: usernameToReceive,
      });

      // Save new Client List Entry
      const clientListResult = await clientListEntry.save();

      if (clientListResult) {
        const consultationRequestAcceptedMessage =
          usernameWhoSent +
          " has accepted your Consultation Request! \n\nAdditional Context:\n" +
          req.body.additionalContext;

        // Sends a new private message, this is encrypted
        const encryptedPrivateMessage = await cryptr.encrypt(
          consultationRequestAcceptedMessage
        );

        // New Private Message Created
        const privateMessage = new PrivateMessage({
          usernameToReceive,
          usernameWhoSent,
          privateMessage: encryptedPrivateMessage,
        });

        // Private Message is saved
        const privateMessageResult = await privateMessage.save();
        if (privateMessageResult) {
          const privateMessageDoc = privateMessageResult._doc;
          delete privateMessageDoc.privateMessage;
          responseHandler(privateMessageResult, res, 201);
        } else {
          errorHandler("Message Failed to be created", res);
        }
      }
    } catch (error) {
      errorHandler("An error has occurred creating this message", res);
    }
  }
}

export default handler;
