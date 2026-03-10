import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error.js";
import { verifyToken, type Payload } from "../utils/JWT.js";


export const AuthMiddlewares = (req:Request, res:Response, next:NextFunction) => {

    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

      // Check if the header exists
  if (!authHeader) {
    throw new UnauthorizedError('Authorization header missing');
  }


  const token = (authHeader as string).split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Authorization header missing');
  }

  const verifyToke = verifyToken(token as string)

  if(!verifyToke) throw new UnauthorizedError('This User is Authorization');

  req.user = verifyToke;

  next()
    
}; 