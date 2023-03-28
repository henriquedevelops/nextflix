import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post("/users/auth", credentials);
          const loggedUser = response.data.loggedUser;
          if (!loggedUser) throw new Error("User not found.");
          return loggedUser;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth",
    signOut: "/",
    error: "/auth",
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
