import { dbConnect } from "../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../utils/common";
import User from "../../models/user";
import nodemailer from "nodemailer";
import { resolveHref } from "next/dist/shared/lib/router/router";
import Token from "../../models/token";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function handler(req, res) {
  crypto.randomUUID;
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
              console.log("Server is ready to take messages");
              resolve(success);
            }
          });
        });

        await Token.find({ userId: userAccount._id }).deleteMany();
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(8));

        await new Token({
          userId: userAccount._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
        var URL = `http://${req.headers.host}/resetPassword/${resetToken}?id=${userAccount._id}`;
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
