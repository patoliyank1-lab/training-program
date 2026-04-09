import type { DeviceType } from "@prisma/generated/prisma/enums.js";
import { prisma } from "../config/database-connection.js";
import type { JWTPayload, UserType } from "../types/Types.js";
import { AppError, UnknownError } from "../utils/errorHandler.js";
import { createToken, verifyToken } from "../utils/JWT.js";
import { comparePassword, hashPassword } from "../utils/password.js";

/**
 * create new user
 * @param user user details
 * @returns return new created user's email and username
 */
export const register = async (user: UserType) => {
  //check username and email
  const userCheck = await prisma.user.findMany({
    where: {
      OR: [{ email: user.email }, { username: user.username }],
    },
  });

  userCheck.map((u) => {
    if (u.email === user.email)
      throw new AppError("This Email is Already Register", 409);
    if (u.username === user.username)
      throw new AppError("This Username is Already Register", 409);
  });

  user.passwordHash = await hashPassword(user.passwordHash);

  const newUser = await prisma.user.create({ data: user });

  return {
    email: newUser.email,
    username: newUser.username,
  };
};

/**
 * login user with email or username.
 * @param param0 - user email or username and password.
 * @returns return user details and tokens
 */
export const login = async ({
  emailOrUsername,
  password,
  ipAddress,
  deviceType,
}: {
  emailOrUsername: string;
  password: string;
  ipAddress: string;
  deviceType: DeviceType;
}) => {
  //check user is register or not.
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: emailOrUsername }, { username: emailOrUsername }] },
  });
  if (!user) {
    throw new AppError("Email or Username is not register.", 400);
  }

  const isSame = await comparePassword(password, user.passwordHash);
  if (!isSame) {
    throw new AppError("email or password incorrect.", 401);
  }

  // create access and refresh Tokens
  const accessToken = createToken(
    user.id,
    user.email,
    60 * 15, // expiry of access Token 15 min.
  );
  const refreshToken = createToken(user.id, user.email);

  /**
   * check user session by using userId, ipAddress, deviceType
   * if exist then update refresh token otherwise create new session
   */
  const userSession = await prisma.userSession.upsert({
    where: {
      userId_ipAddress_deviceType: {
        userId: user.id,
        ipAddress,
        deviceType,
      },
    },
    update: {
      refreshTokenHash: refreshToken,
    },
    create: {
      userId: user.id,
      ipAddress,
      deviceType,
      refreshTokenHash: refreshToken,
      // 7 Day from current Time
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastActiveAt: new Date(Date.now()),
    },
  });

  // return session details.
  return {
    userId: userSession.userId,
    emailOrUsername,
    lastActiveAt: userSession.lastActiveAt,
    expiresAt: userSession.expiresAt,
    Token: {
      refreshToken,
      accessToken,
    },
  };
};

/**
 * create new access token by verifying refreshToken
 * @param param0 - device details and token
 * @returns
 */
export const refreshToken = async ({
  token,
  ipAddress,
  device,
}: {
  token: string;
  ipAddress: string;
  device: DeviceType;
}) => {
  try {
    const payload = verifyToken(token) as JWTPayload;

    // verify token
    const session = await prisma.userSession.findFirst({
      where: {
        userId: payload.userId,
        ipAddress,
        deviceType: device,
      },
    });
    if (!session || (session && session.refreshTokenHash !== token))
      throw new AppError("Invalid RefreshToken or Token expired", 401);

    const newAccessToken = createToken(
      payload.userId,
      payload.email,
      60 * 15, // expiry of access Token 15 min.
    );
    return {
      refreshToken: token,
      accessToken: newAccessToken,
    };
  } catch (error) {
    throw new UnknownError(error);
  }
};
