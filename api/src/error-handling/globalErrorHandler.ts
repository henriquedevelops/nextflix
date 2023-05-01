import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import CustomError from "./customError";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/* 

Global error handling middleware verifies the error source and then 
sends an appropriate HTTP response with an error message and status 
code included following the REST architecture. 

If the error is not recognized, it sends a 500 status code with a 
generic error message.

*/

export default (
  err: CustomError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2023" || err.code === "P2025") {
      return res.status(404).json({
        message: "Requested resource was not found.",
      });
    } else if (err.code === "P2002") {
      return res.status(409).json({
        message: "Conflict in database.",
      });
    } else {
      return res.status(400).json({
        message: "Invalid request",
      });
    }
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      message: "Token has expired",
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    name: "Internal Server Error",
    message: "An internal server error occurred",
    statusCode: 500,
  });
};
