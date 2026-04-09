import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/JWT.js";
import { AppError } from "../utils/errorHandler.js";
import { prisma } from "../config/database-connection.js";
import type { JWTPayload } from "../types/Types.js";

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
    throw new AppError("accessToken not found.", 401);
  }

  // verify JWT token
  const details: JWTPayload = verifyToken(token as string);
  if (!details) throw new AppError("This User is Authorization", 401);

  // check user details in database.
  const user = await prisma.user.findFirst({
    where: {
      id: details.userId,
    },
  });
  if (!user) throw new AppError("This user is no exist or token expire.", 401);

  req.user = { email: user.email, userId: user.id };

  next();
};
