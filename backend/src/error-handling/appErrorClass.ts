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

export class UnauthorizedError extends CustomError {
  get statusCode(): number {
    return 401;
  }
}
