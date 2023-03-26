import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error-handling/appErrorClass";
import tryCatch from "../error-handling/tryCatch";
import dotenv from "dotenv";
dotenv.config();

type User = {
  id: string;
  email: string;
};

const jwtSecret = process.env.JWT_SECRET;

/* This function sends a signed JSON Web Token (JWT) to the client as a cookie.
It will expire in 1 hour. */
export const sendToken = (user: User, statusCode: number, res: Response) => {
  if (!jwtSecret) throw new Error("JWT secret not defined");
  const token = jwt.sign({ user }, jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, { httpOnly: true });

  res.status(statusCode).json({
    user,
    token,
  });
};

/* This function authenticates a user by extracting the JWT token 
from the cookies in the request object, verifying it, and then adding 
user object to the request object before calling the next middleware. */
export const authenticate = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) throw new UnauthorizedError("Please log in first");
    if (!jwtSecret) throw new Error("JWT secret not detected");
    const decoded: any = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  }
);
