import type { NextFunction, RequestHandler, Request, Response } from "express";


/**
 * handle async function and unexpected Error
 * @param callback  controller function
 * @returns return Promise of given function
 * @throws pass unexpected Error on Error handler
 */
export const asyncHandler = (
  callback: (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<any>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};
