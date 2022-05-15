import { dbConnect } from "../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../utils/common";
import User from "../../../models/user";
import nodemailer from "nodemailer";
import { getSession } from "next-auth/client";

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
      const email = req.body.email;
      validateAllFields(email);
      await dbConnect();
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          type: "OAUTH2",
          user: "xtremetrackingemailer@gmail.com",
          clientId:
            "354162476910-s1paue44vnee5jh7ajakmjud5dscrglq.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken:
            "1//04ETufg_V3Q8uCgYIARAAGAQSNwF-L9IrnXp1hWowxE4-XfwDTY0vaVWTVAzcw2QsoKmcXP4oPugaYL_zQpJUWprvl79EdeJJTt4",
          accessToken:
            "ya29.a0ARrdaM9s1xYN4u6BMHjkpYA-mPqv9kwY2HaV6iWcNbxHWCasY4fx-eyA30lZc-pZBlilcxR_J8Whx36xznSXyjeOI-0HFRuHOKqbrCt4SSy-BrnLmXxmtmBP3_L2c8cNWAJU4giElaLfe1dByTDnN104ses8",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await new Promise((resolve, reject) => {
        //verify connection configuration
        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(success);
          }
        });
      });

      var mail = {
        from: "Xtreme Tracking Team <from@gmail.com>",
        to: "xtremetrackingemailer@gmail.com",
        subject: "Enquiry from " + session.user.username,
        text: email,
      };

      await new Promise((resolve, reject) => {
        // sending mail
        transporter.sendMail(mail, (err, info) => {
          if (err) {
            errorHandler("This email failed to send", res);
            reject(error);
          } else {
            responseHandler("Email has been sent successfully", res, 201);
            resolve(success);
          }
        });
      });
    } catch (error) {
      errorHandler("An error has occurred while sending this email", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
