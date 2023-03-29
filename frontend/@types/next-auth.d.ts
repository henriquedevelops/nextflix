import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      email: string;
      exp: number;
      iat: number;
    };
  }
}
