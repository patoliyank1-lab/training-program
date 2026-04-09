import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";
import { User } from "../models/user-model.js";
// import User from "../models/user-model.js";
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
  const token = req.cookies["access-token"];

  if (!token) {
    throw new UnauthorizedError("accessToken not found.");
  }

  const verifyToke: Payload | undefined = verifyToken(token as string);

  if (!verifyToke) throw new UnauthorizedError("This User is Authorization");

  const user = await User.findByPk((verifyToke as Payload).userId);
  if (!user)
    throw new UnauthorizedError("This user is no exist or token expire.");

  req.user = verifyToke;

  next();
};
