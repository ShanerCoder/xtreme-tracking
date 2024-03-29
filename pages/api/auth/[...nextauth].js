import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/account/user";
import bcrypt from "bcrypt";
import { dbConnect } from "../../../lib/db-connect";
import Token from "../../../models/account/token";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;
        await dbConnect();

        // Check to see if user does not exist
        const user = await User.findOne({ username });
        if (!user) throw new Error("User not found");
        const userDoc = user._doc;

        // Check to see if password entered matches the encrypted value stored in the database
        const isMatched = await bcrypt.compare(password, userDoc.password);
        if (user && isMatched) {
          // Any object returned will be saved in `user` property of the JWT
          delete userDoc.password;

          // Removes any existing tokens created from the Forgot Password functionality for this user
          await Token.find({ userId: user._id }).deleteMany();
          return userDoc;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Invalid Password");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    // Session is returned, with the values assigned
    async session(session, user) {
      if (user && user) {
        session.user.id = user.id;
        session.user.username = user.username;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user && user._id) {
        token.id = user._id;
        token.username = user.username;
      }
      return token;
    },
  },
});
