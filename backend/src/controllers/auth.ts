import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import tryCatch from "../error-handling/tryCatch";
import dotenv from "dotenv";
import CustomError from "../error-handling/customError";
import { log } from "console";
import prisma from "../../prisma/client";
import { compare } from "bcrypt";
import { decodedToken } from "../utils/types";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const login = tryCatch(async (req: Request, res: Response) => {
  const userFound = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!userFound) throw new CustomError("Invalid email address.", 401);

  const passwordIsCorrect = await compare(
    req.body.password,
    userFound.password
  );
  if (!passwordIsCorrect) throw new CustomError("Wrong password.", 401);

  const { password: _, email, id, isAdmin } = userFound;

  if (!jwtSecret) throw new CustomError("JWT secret not found", 500);
  const accessToken = jwt.sign({ email, id, isAdmin }, jwtSecret, {
    expiresIn: "12h",
  });
  res.cookie("accessToken-Nextflix", accessToken, {
    httpOnly: true,
  });

  res.sendStatus(200);
});

/* This function authenticates a user by extracting the JWT token 
from the cookies in the request object, verifying it, and then adding 
user object to the request object before calling the next middleware. */
export const requireLogin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!jwtSecret) throw new CustomError("JWT secret not found.", 500);

    const tokenReceived = req.cookies["accessToken-Nextflix"];
    if (!tokenReceived) throw new CustomError("Unauthorized", 401);

    const { email, id, isAdmin } = jwt.verify(
      tokenReceived,
      jwtSecret
    ) as decodedToken;

    if (!email || !id) throw new CustomError("Unauthorized", 401);

    req.userIsAdmin = isAdmin;
    next();
  }
);

export const restricToAdmin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userIsAdmin) throw new CustomError("Unauthorized", 401);

    next();
  }
);

export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken-Nextflix");

  res.sendStatus(200);
};
