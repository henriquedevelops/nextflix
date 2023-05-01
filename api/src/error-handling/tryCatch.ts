import { NextFunction, Request, Response } from "express";

type AsyncFunction<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

/* 

This higher-order function takes an asynchronous function as 
an argument and returns it wrapped in a try-catch block, eliminating 
the need for repetitive error handling. Any errors thrown by the 
wrapped function are caught and passed to Express's global error 
handling middleware. 

*/

export default <T>(asyncFunction: AsyncFunction<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
