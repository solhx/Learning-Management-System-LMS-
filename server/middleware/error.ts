import { NextFunction, Request, Response } from "express";
import ErrorHandeler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server eroor";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found , invalid ${err.path}`;
    err = new ErrorHandeler(message, 400);
  }

  //Duplicate key eror
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.KeyValue)} entered`;
    err = new ErrorHandeler(message, 400);
  }

  // wrong Jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandeler(message, 400);
  }
  // Jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, try again`;
    err = new ErrorHandeler(message, 400);
  }

  res.status(err.statusCode).json({
    succes: false,
    message: err.message,
  });
};
