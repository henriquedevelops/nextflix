import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { UnauthorizedError } from "../error-handling/appErrorClass";
import tryCatch from "../error-handling/tryCatch";

const jwtSecret = process.env.JWT_SECRET;

/* This function generates a JSON Web Token (JWT) for a given user ID using 
the provided JWT secret key and returns it as a string. The generated token 
will expire in 1 hour. */
export const generateToken = (userId: number): string | undefined => {
  const token =
    jwtSecret &&
    jwt.sign({ userId }, jwtSecret, {
      expiresIn: "1h",
    });
  return token;
};

/* This function takes a token string and returns a Promise that resolves to 
an object containing the userId as a string, after verifying the token using 
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
from the authorization header, verifying it, and retrieving the 
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
