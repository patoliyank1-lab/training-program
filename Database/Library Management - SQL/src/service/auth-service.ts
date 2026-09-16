import type { UserType } from "../types/Types.js";
import { prisma } from "../config/database-connection.js";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { createToken } from "../utils/JWT.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import type { Role } from "../../generated/prisma/enums.js";

export const register = async (user: UserType, role?: Role) => {
  //Email check
  const emailUser = await prisma.user.findFirst({
    where: { email: user.email },
  });
  if (emailUser) {
    throw new ConflictError("This email is already resister");
  }

  user.password = await hashPassword(user.password);

  const newUser = role
    ? await prisma.user.create({ data: { ...user, role } })
    : await prisma.user.create({ data: user });

  // return true or false
  const { password: _password, ...otherValue } = newUser;

  const response = {
    user: otherValue,
  };
  return response;
};

export const login = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  //Email check
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new ConflictError("Email is not register.");
  }

  const isSame = await comparePassword(pass, user.password);
  if (!isSame) {
    throw new BadRequestError("email or password incorrect.");
  }

  const accessToken = createToken(
    String(user.id),
    user.email,
    user.role,
    60 * 15, // expiry of access Token 15 min.
  );
  const refreshToken = createToken(String(user.id), user.email, user.role);

  user.refreshToken = refreshToken;
  user.loginStatus = true;

  const newUser = await prisma.user.update({
    where: { email },
    data: {
      refreshToken,
      loginStatus: true,
    },
    omit: {
      password: true,
      refreshToken: true,
      loginStatus: true,
    },
  });

  const response = {
    user: newUser,
    accessToken,
    refreshToken,
  };
  return response;
};
