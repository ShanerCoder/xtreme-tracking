import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import emailjs from "emailjs-com";
import User from "../../models/user";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const email = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const filter = { email: email };
      const userAccount = await User.findOne(filter);
      if (userAccount) {
        responseHandler(userAccount.forename, res, 200);
      } else {
        errorHandler("This email is not linked to any account", res);
        return null;
      } /*
      if (privateMessageResult) {
        const privateMessageDoc = privateMessageResult._doc;
        delete privateMessageDoc.privateMessage;
        responseHandler(privateMessageResult, res, 201);
      } else {
        errorHandler("Message Failed to be created", res);
      }*/
    } catch (error) {
      console.log(error);
      errorHandler("An error has occurred while sending this email", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
