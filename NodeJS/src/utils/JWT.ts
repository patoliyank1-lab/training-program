import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./error.js";

export interface Payload {
  userId: string;
  email: string;
  role: string;
}

const secret = process.env.JWT_SECRET ?? "Secret@123";

/**
 * give JWT token using Payload {userId, email, role}.
 * @param id userId in string type
 * @param email email in string type
 * @param role user role in string type.
 * @param ex expiry time in second integer type
 * @returns JWT token 
 */
export const createToken = (
  id: string,
  email: string,
  role: string,
  ex?: number,
) => {
  const payload: Payload = {
    userId: id,
    email: email,
    role: role,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: ex ?? "1h", // Token expires in 1 hour
  });

  return token;
};

/**
 * function verify Token and return payload or throw Error on Invalid token.
 * @param token JWT token which is want to verify.
 * @returns return payload {userId, email, role}
 * @throws Error on token is invalid.
 */
export const verifyToken = (token: string) => {
  let payload: Payload | undefined = undefined;

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }
    payload = user as Payload; // Attach user payload to the request object
  });
  return payload;
};
