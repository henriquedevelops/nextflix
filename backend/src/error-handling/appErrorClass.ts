/* This class CustomError extends the built-in JavaScript 
Error class and adds a statusCode getter and a toJSON method. 
The statusCode getter is used to set the HTTP status code for 
the error, and the toJSON method returns an object with the 
error name, message, stack trace, and status code. */
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  get statusCode(): number {
    return 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      statusCode: this.statusCode,
    };
  }
}

/* UnauthorizedError extends the CustomError class and overrides the 
statusCode getter to return 401, which is the HTTP status code for 
unauthorized access. This class can be used for handling authentication 
and authorization errors. */
export class UnauthorizedError extends CustomError {
  get statusCode(): number {
    return 401;
  }
}

export class ResourceConflictError extends CustomError {
  get statusCode(): number {
    return 409;
  }
}
