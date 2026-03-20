import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";
import User from "../models/User.js";

/**
 * this Middlewares is verify token user register in database.
 * @param req express Request
 * @param res express Response
 * @param next NextFunction for pass process to next Middlewares
 */
export const AuthMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  // Check if the header exists
  if (!authHeader) {
    throw new UnauthorizedError("Authorization header missing");
  }

  // check JWT token and verify
  const token = authHeader;

  if (!token) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const verifyToke: Payload | undefined = verifyToken(token as string);

  if (!verifyToke) throw new UnauthorizedError("This User is Authorization");

  // check user is register or not.
  const mongoUser = await User.findOne({ _id: (verifyToke as Payload).userId });
  const user = mongoUser?.toObject();
  if (!user)
    throw new UnauthorizedError("This user is no exist or token expire.");

  req.user = verifyToke;

  next();
};
