import { User } from "next-auth";

interface CustomUser {
  id: string;
  accessToken: string;
  email: string;
  isAdmin: boolean;
  exp: number;
  iat: number;
}

declare module "next-auth" {
  interface User extends CustomUser {}
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
