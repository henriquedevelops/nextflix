import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { UnauthorizedError } from "../error-handling/appErrorClass";
import tryCatch from "../error-handling/tryCatch";

type User = {
  id: string;
  email: string;
};

const jwtSecret = process.env.JWT_SECRET;

/* This function sends a signed JSON Web Token (JWT) to the client as a cookie.
It will expire in 1 hour. */
export const sendToken = (user: User, statusCode: number, res: Response) => {
  const token =
    jwtSecret &&
    jwt.sign({ user }, jwtSecret, {
      expiresIn: "1h",
    });

  res.cookie("jwt", token, { httpOnly: true });

  res.status(statusCode).json({
    user,
    token,
  });
};

/* This function takes a token string and returns a Promise that resolves to 
an object containing the user id as a string after verifying the token using 
the jwt.verify method. If the verification fails, the Promise is rejected with 
the corresponding error. */
export const verifyToken = (token: string): Promise<{ userId: string }> => {
  return new Promise((resolve, reject) => {
    jwtSecret &&
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as { userId: string });
      });
  });
};

/* This function authenticates a user by extracting a bearer token 
from the authorization header, verifying it, and then retrieving the 
corresponding user from the database using Prisma. The user object 
is then added to the request object before calling the next middleware. */
export const authenticate = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new UnauthorizedError("Not logged in");
    const token = authHeader.substring("Bearer ".length);
    const { userId } = await verifyToken(token);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });
    req.user = currentUser;
    next();
  }
);
