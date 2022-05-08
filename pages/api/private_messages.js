import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import PrivateMessage from "../../models/privateMessage";
import Cryptr from "cryptr";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const { usernameToReceive, usernameWhoSent } = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const encryptedPrivateMessage = await cryptr.encrypt(
        req.body.privateMessage
      );

      const privateMessage = new PrivateMessage({
        usernameToReceive,
        usernameWhoSent,
        privateMessage: encryptedPrivateMessage,
      });

      const privateMessageResult = await privateMessage.save();
      if (privateMessageResult) {
        const privateMessageDoc = privateMessageResult._doc;
        delete privateMessageDoc.privateMessage;
        responseHandler(privateMessageResult, res, 201);
      } else {
        errorHandler("Message Failed to be created", res);
      }
    } catch (exception) {
      console.log(exception);
      errorHandler("An error has occurred creating this message", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
