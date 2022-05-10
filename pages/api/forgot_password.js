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
              "1//04f_0zsZ61moDCgYIARAAGAQSNwF-L9IrrgueOqLuyix0SazUmdcg6FyKds4bZ3vTw0L-Nr1XB57u05ggUJVFGdnieyATRABL0xU",
            accessToken:
              "ya29.A0ARrdaM8ROWcKZ5eLTlgvNQyADwc2eALGmj3X4gGRioUiocM-9RFEjn-Aq2u2fuQBz82X7td8QDm5HevGwps-FZoytuANh73A9osoRQrpdKdyWejtvNmisoazFSal2CCF7eKQC-2k0wUQy6_ekjU3xxu8SmNP",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        console.log(userAccount._id.toString());
        let token = await Token.findOne({ _id: userAccount._id.toString() });
        if (token) await token.deleteOne();
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(8));

        await new Token({
          userId: userAccount._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
        var URL = `http://${req.headers.host}/resetPassword/${resetToken}&id=${userAccount._id}`;
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
