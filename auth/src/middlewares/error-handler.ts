import {NextFunction, Request, Response} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("handling error", err);
  }
  if (err instanceof DatabaseConnectionError) {
    console.log("handling database error", err);
  }
  console.log("Something went wrong while trying to login!", err);
  res.status(400).send({
    message: err.message,
  });
}