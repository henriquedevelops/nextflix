import NextAuth, { NextAuthOptions } from "next-auth";
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
          const response = await axios.post("/users/auth", credentials);
          const loggedUser = response.data.loggedUser;
          const accessToken = response.data.accessToken;
          if (!loggedUser || !accessToken)
            throw new Error(
              "Invalid credentials. (At the [...nextauth].ts file) "
            );
          return { accessToken, ...loggedUser };
        } catch (error) {
          console.log(error);
          console.log("testando");
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
      session.user = token;
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
