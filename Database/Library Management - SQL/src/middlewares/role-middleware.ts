import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error.js";

export const setLibrarianRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body.role = "LIBRARIAN";
  next();
};

export const isLibrarian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    (req.user && req.user.role === "LIBRARIAN") ||
    (req.user && req.user.role === "ADMIN")
  ) {
    next();
  } else {
    throw new BadRequestError("This route is only access by seller.");
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    throw new BadRequestError("This route is only access by Admin.");
  }
};
