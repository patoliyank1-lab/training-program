import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error.js";

export const setSellerRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body.role = "seller";
  next();
};

export const isSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    throw new BadRequestError("This route is only access by seller.");
  }
};
