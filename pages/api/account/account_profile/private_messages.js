import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import PrivateMessage from "../../../../models/accountProfile/privateMessage";
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
      if (session.user.username != req.body.usernameWhoSent) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const { usernameToReceive, usernameWhoSent } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // Encrypts private message inputted by user
      const encryptedPrivateMessage = await cryptr.encrypt(
        req.body.privateMessage
      );

      // Creates new Private Message
      const privateMessage = new PrivateMessage({
        usernameToReceive,
        usernameWhoSent,
        privateMessage: encryptedPrivateMessage,
      });

      // Saves new Private Message
      const privateMessageResult = await privateMessage.save();
      if (privateMessageResult) {
        const privateMessageDoc = privateMessageResult._doc;
        delete privateMessageDoc.privateMessage;
        responseHandler(privateMessageResult, res, 201);
      } else {
        errorHandler("Message Failed to be created", res);
      }
    } catch (error) {
      errorHandler("An error has occurred creating this message", res);
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

      // Deletes Private Message Entry
      const deleteMessageResult = await PrivateMessage.deleteOne({
        _id: req.body.messageId,
        usernameToReceive: session.user.username,
      });
      if (deleteMessageResult) responseHandler(deleteMessageResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Message", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
