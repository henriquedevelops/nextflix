/* This class CustomError extends the built-in JavaScript 
Error class and adds a statusCode getter and a toJSON method. 
The statusCode getter is used to set the HTTP status code for 
the error, and the toJSON method returns an object with the 
error name, message, stack trace, and status code. */
export default class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
