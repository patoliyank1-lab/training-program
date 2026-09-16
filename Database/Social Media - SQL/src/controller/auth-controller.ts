import { asyncHandler } from "@/utils/async-handler.js";
import * as authService from "../service/auth-service.js";
import { formattedResponse } from "@/utils/response.js";
import { AppError } from "@/utils/errorHandler.js";
import { DeviceType } from "@prisma/generated/prisma/enums.js";
import { UAParser } from "ua-parser-js";

/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, phoneNumber } = req.body;

  const response = await authService.register({
    email,
    passwordHash: password,
    username,
    phoneNumber,
  });

  if (response)
    formattedResponse(res, 201, response, "User Register successfully.");
});

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const {
    emailOrUsername,
    password,
  }: { emailOrUsername: string; password: string } = req.body;

  // get ip and device type.
  const clientIp = req.ip ?? "0.0.0.0";
  const parser = new UAParser(req.headers["user-agent"]);
  const device = parser.getDevice();
  const os = parser.getOS();

  let deviceType: DeviceType;

  if (device.type === "mobile") {
    const osName = (os.name ?? "").toLowerCase();
    deviceType = osName.includes("android") ? "android" : "ios";
  } else {
    deviceType = "desktop";
  }

  const response = await authService.login({
    emailOrUsername,
    password,
    ipAddress: clientIp,
    deviceType: deviceType,
  });

  const { Token, ...rest } = response;
  formattedResponse(
    res,
    200,
    rest,
    "User Login successfully",
    Token.accessToken,
    Token.refreshToken,
  );
});

/**
 * @description  generateToken new access Token.
 * @route GET /api/refresh-token/
 * @access login user.
 */
export const generateToken = asyncHandler(async (req, res) => {
  // get token from req
  const token = req.cookies["refresh-token"];
  if (!token) throw new AppError("Refresh Token not found.", 401);
  // get token from database

  // get ip and device type.
  const clientIp = req.ip ?? "0.0.0.0";
  const parser = new UAParser(req.headers["user-agent"]);
  const device = parser.getDevice();
  const os = parser.getOS();
  console.log(device, os);

  let deviceType: DeviceType;

  if (device.type === "mobile") {
    const osName = (os.name ?? "").toLowerCase();
    deviceType = osName.includes("android") ? "android" : "ios";
  } else {
    deviceType = "desktop";
  }

  const response = await authService.refreshToken({
    token,
    device: deviceType,
    ipAddress: clientIp,
  });

  formattedResponse(
    res,
    201,
    null,
    "New Token Gradated sussfully",
    response.accessToken,
  );
});
