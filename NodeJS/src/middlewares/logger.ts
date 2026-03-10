import type { NextFunction, Request, Response } from "express";

export const requestLogger = (req:Request, res:Response, next:NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next();
};