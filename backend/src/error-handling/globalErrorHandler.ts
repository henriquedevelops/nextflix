import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./appErrorClass";

interface PrismaError {
  code: string;
  clientVersion: string;
  meta: {
    message: string;
  };
}

export default (
  err: Error | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2023") {
      res.status(400).json({
        message: "Requested resource was not found.",
        statusCode: 404,
      });
    }
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.toJSON());
  }

  res.status(500).json({
    name: "Internal Server Error",
    message: "An internal server error occurred",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    statusCode: 500,
  });
};
