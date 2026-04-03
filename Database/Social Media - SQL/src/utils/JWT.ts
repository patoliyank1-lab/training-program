import jwt from "jsonwebtoken";

export interface Payload {
  userId: string;
  email: string;
  role: string;
}

const secret = process.env.JWT_SECRET ?? "Secret@123";
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
    expiresIn: ex ?? "24h", // Token expires in 1 hour
  });

  return token;
};

export const verifyToken = (token: string) => {
  const payload: Payload = jwt.verify(token, secret) as Payload;
  return payload;
};
