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

/* Authenticate a user by checking his username and password, generate a 
JWT access token with a 12-hour expiration time, and sets it as an 
HTTP-only cookie in the response. */
export const login = tryCatch(async (req: Request, res: Response) => {
  const userFound = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!userFound) throw new CustomError("Invalid username.", 400);

  const passwordIsCorrect = await compare(
    req.body.password,
    userFound.password
  );
  if (!passwordIsCorrect) throw new CustomError("Wrong password.", 400);

  const { password: _, username, id, isAdmin } = userFound;

  if (!jwtSecret) throw new CustomError("JWT secret not found", 500);
  const accessToken = jwt.sign({ username, id, isAdmin }, jwtSecret, {
    expiresIn: "12h",
  });

  res
    .status(200)
    .cookie("accessToken-Nextflix", accessToken, {
      httpOnly: true,
    })
    .end();
});

/* Extract the JWT token from the cookies in the request object, verify it,
and then add the user object to the request object before calling the next
middleware. */
export const requireLogin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!jwtSecret) throw new CustomError("JWT secret not found.", 500);

    const tokenReceived = req.cookies["accessToken-Nextflix"];
    if (!tokenReceived) throw new CustomError("Unauthorized", 401);

    const { username, id, isAdmin } = jwt.verify(
      tokenReceived,
      jwtSecret
    ) as decodedToken;

    if (!username || !id) throw new CustomError("Unauthorized", 401);

    req.user = { isAdmin, id };
    next();
  }
);

export const restricToAdmin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin)
      throw new CustomError("This route is restricted for administrators", 403);

    next();
  }
);

export const logout = (req: Request, res: Response) => {
  res.status(200).clearCookie("accessToken-Nextflix").end();
};
