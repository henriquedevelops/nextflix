import NextAuth, { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post<{ loggedUser: User }>(
            "/users/auth",
            credentials
          );
          const loggedUser = response.data.loggedUser;
          if (!loggedUser)
            throw new Error(
              "Invalid credentials. (At the [...nextauth].ts file) "
            );
          return loggedUser;
        } catch (error) {
          console.log(error, "erro do authOptions");
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = token as any;
      return session;
    },
  },

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
