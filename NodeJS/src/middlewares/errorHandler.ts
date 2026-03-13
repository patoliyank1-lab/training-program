import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Something went wrong!';
  if( statusCode >= 500 ){
      req.winLog.error(err)
  }
  else{
    req.winLog.warn(`${statusCode} - ${message}`);  // highlight error by bold red color
  }


  // send error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};