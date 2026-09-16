import jwt from "jsonwebtoken";
import type { JWTPayload } from "../types/Types.js";



const secret = process.env.JWT_SECRET ?? "Secret@123";
export const createToken = (
  id: string,
  email: string,
  ex?: number,
) => {
  const payload: JWTPayload = {
    userId: id,
    email: email,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: ex ?? "1w", // Token expires in 1 week hour
  });

  return token;
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, secret) ;
  return payload;
};
