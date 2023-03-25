import { NextFunction, Request, Response } from "express";

/* 

Global error handling middleware that verifies the error and 
then invokes its corresponding error handling function.

*/

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(400).send(error.message);
};
