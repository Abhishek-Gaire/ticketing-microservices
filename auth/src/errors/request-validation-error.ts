import {CustomError} from "./custom-error";
import {ValidationError} from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode: number;

  constructor(
    public errors: ValidationError[]
  ) {
    super("Request validation error");

    this.statusCode = 400

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return {message: err.msg, field: err.path};
      }
      return {message: err.msg};
    });
  }
}