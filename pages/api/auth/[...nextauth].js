import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import { dbConnect } from "../../../lib/db-connect";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;
        await dbConnect();
        const user = await User.findOne({ username });
        if (!user) throw new Error("User not found");
        const userDoc = user._doc;
        const isMatched = await bcrypt.compare(password, userDoc.password);
        console.log("is matched: " + isMatched);
        if (user && isMatched) {
          // Any object returned will be saved in `user` property of the JWT
          delete userDoc.password;
          console.log({ userDoc });
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
    async session(session, user) {
      console.log(user);
      if (user && user) {
        session.user.id = user;
        session.user.username = user.username;
        console.log({ session });
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user && user._id) {
        token.id = user._id;
        token.username = user.username;
        console.log({ token });
      }
      return token;
    },
  },
});
