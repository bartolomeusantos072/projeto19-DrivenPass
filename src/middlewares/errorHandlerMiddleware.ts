import { NextFunction, Request, Response } from "express";
import {
  IError,
  errorTypeToStatusCode,
  isError,
} from "../utils/errorUtils";

export function errorHandlerMiddleware(
  err: Error | IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (isError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
