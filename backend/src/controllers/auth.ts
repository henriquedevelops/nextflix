import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import tryCatch from "../error-handling/tryCatch";
import dotenv from "dotenv";
import CustomError from "../error-handling/customError";
import { log } from "console";
import prisma from "../../prisma/client";
import { compare } from "bcrypt";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const login = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new CustomError("Invalid email address.", 401);

  const passwordIsCorrect = await compare(password, user.password);
  if (!passwordIsCorrect) throw new CustomError("Wrong password.", 401);
  const { password: _, ...loggedUser } = user;

  if (!jwtSecret) throw new CustomError("JWT secret not found", 500);
  const accessToken = jwt.sign({ user }, jwtSecret, {
    expiresIn: "1h",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.status(200).json({ loggedUser });
});

/* This function authenticates a user by extracting the JWT token 
from the cookies in the request object, verifying it, and then adding 
user object to the request object before calling the next middleware. */
export const requireLogin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!jwtSecret) throw new CustomError("JWT secret not found.", 500);

    const token =
      req.cookies.accessToken || req.cookies["next-auth.session-token"];
    console.log(token);
    if (!token) throw new CustomError("Please log in first", 401);

    console.log("2");
    const { user } = jwt.verify(token, jwtSecret) as any;
    console.log("3", user);
    if (!user) throw new CustomError("Please log in first", 401);
    next();
  }
);
