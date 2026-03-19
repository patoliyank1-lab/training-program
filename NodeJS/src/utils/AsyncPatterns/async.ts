import type { NextFunction, Response, Request } from "express";
import { fakeAPi } from "./fakeApi.js";

export const asyncRouteForFAkeApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await fakeAPi;
    res.send(response);
  } catch (error) {
    return next(error);
  }
};

// resolve api using Promise
export const asyncRouteForApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await fetch("https://dummyjson.com/users?delay=1000");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    return next(error);
  }
};
