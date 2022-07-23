import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import User from "../../../../models/account/user";
import nodemailer from "nodemailer";
import Token from "../../../../models/account/token";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function handler(req, res) {
  // Generates a random UUID, used for the unique token email
  crypto.randomUUID;
  if (req.method === "POST") {
    // Post Request
    try {
      const email = req.body;
      validateAllFields(req.body);
      await dbConnect();
      const filter = { email: email };
      // Finds User Email
      const userAccount = await User.findOne(filter);

      // If Email exists create nodemailer transport
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

        // Confirms that transport is valid
        await new Promise((resolve, reject) => {
          //verify connection configuration
          transporter.verify(function (error, success) {
            if (error) {
              reject(error);
            } else {
              resolve(success);
            }
          });
        });

        // Removes any existing tokens for the user account
        await Token.find({ userId: userAccount._id }).deleteMany();

        // Creates new reset token
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(8));

        // Sends out email to reset password
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
      errorHandler("An error has occurred while sending this email", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
