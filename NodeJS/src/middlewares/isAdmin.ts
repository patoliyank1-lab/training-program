import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/error.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) throw new UnauthorizedError("Unauthorized Parson.");

  if (String(user.role) !== "admin") {
    throw new UnauthorizedError("This route is only access by Admin.");
  }
  next();
};
