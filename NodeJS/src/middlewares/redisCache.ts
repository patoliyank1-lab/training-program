import type { Request, Response, NextFunction } from "express";
import { getCache } from "../config/redis.connect.js";

export const readCash = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await getCache(req.originalUrl);
  if (!response) {
    next();
  } else {
    res.json(JSON.parse(response));
  }
};
