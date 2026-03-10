import type { ErrorRequestHandler } from "express";
import { styleText } from "node:util";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.error(styleText(['red', 'bold'] ,err.message));  // highlight error by bold red color
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Something went wrong!';


  // send error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};