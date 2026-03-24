import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";
import User from "../models/user-model.js";
/**
 * authenticate access token
 * @param req 
 * @param res 
 * @param next 
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

  const token = authHeader;

  if (!token) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const verifyToke: Payload | undefined = verifyToken(token as string);

  if (!verifyToke) throw new UnauthorizedError("This User is Authorization");

  const mongoUser = await User.findOne({ _id: (verifyToke as Payload).userId });
  const user = mongoUser?.toObject();
  if (!user)
    throw new UnauthorizedError("This user is no exist or token expire.");

  req.user = verifyToke;

  next();
};
