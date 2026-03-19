import { fakeAPi } from "./fakeApi.js";
import type { Request, Response } from "express";

export const promiseRouteForFAkeApi = (req: Request, res: Response) => {
  Promise.resolve(fakeAPi).then((value) => {
    return res.send(value);
  });
};

// resolve api using Promise
export const promiseRouteForApi = (req: Request, res: Response) => {
  Promise.resolve(fetch("https://dummyjson.com/users?delay=1000"))
    .then((value) => value.json())
    .then((value) => {
      console.log(value);
      return res.send(value);
    });
};
