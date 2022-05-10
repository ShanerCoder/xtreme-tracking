import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import emailjs from "emailjs-com";
import User from "../../models/user";
import nodemailer from "nodemailer";
import { resolveHref } from "next/dist/shared/lib/router/router";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const email = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const filter = { email: email };
      const userAccount = await User.findOne(filter);
      if (userAccount) {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            type: "OAUTH2",
            user: "xtremetrackingemailer@gmail.com",
            clientId:
              "354162476910-s1paue44vnee5jh7ajakmjud5dscrglq.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken:
              "1//04CYzjXY0vo2dCgYIARAAGAQSNwF-L9Irq47T0IfDl0zjfOdrRO-n0CAP556dJy6qvRlqP-UHkYwFcRAMVn2IoD0tBx-0aTH1a8I",
            accessToken:
              "ya29.A0ARrdaM9JEdo3sFA72yTmKicoTKYUbdIGZTKlq1sSGSbr6fEv0PYAGh_XytGUWgTf-waUvFDUBpZiI4iqb1yyEq2M7kEdUPVb_eqeVDQm1dP13368Zz27KkN-k3iZI4Mv2r6koIeJaTNIMY3ctZvNblIdaO2J",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        var URL = "http://test.com";
        var mail = {
          from: "Xtreme Tracking Team <from@gmail.com>",
          to: userAccount.email,
          subject: "Xtreme Tracking - Forgot Password",
          text:
            "Hello " +
            userAccount.forename +
            ",\n\nA password reset link was requested for this email. You can find the link to reset your password below:\n\n" +
            URL +
            "\n\nIf you did not request this, please ignore this email.\nRegards,\nThe Xtreme Tracking Team",
        };
        const emailSent = await transporter.sendMail(mail);
        if (emailSent) {
          responseHandler("Email has been sent successfully", res, 201);
        } else {
          errorHandler("This email failed to send", res);
        }
      } else {
        errorHandler("This email is not linked to any account", res);
        return null;
      }
    } catch (error) {
      console.log(error);
      errorHandler("An error has occurred while sending this email", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
