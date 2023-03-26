import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { UnauthorizedError } from "../error-handling/appErrorClass";
import tryCatch from "../error-handling/tryCatch";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId: number): string | undefined => {
  const token =
    jwtSecret &&
    jwt.sign({ userId }, jwtSecret, {
      expiresIn: "1h",
    });
  return token;
};

export const verifyToken = (token: string): Promise<{ userId: string }> => {
  return new Promise((resolve, reject) => {
    jwtSecret &&
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as { userId: string });
      });
  });
};

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
