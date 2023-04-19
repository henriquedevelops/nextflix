/* 

This is a class that extends the built-in Error class. 

It adds a statusCode property to represent the HTTP status code 
associated with the error, and a custom constructor to create
instances of the CustomError class with the given error message 
and status code following the REST architecture.

*/

export default class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
