import { asyncHandler } from "../utils/async-handler.js";
import { authService } from "../service/auth-service.js";
import { formattedResponse } from "../utils/response.js";
// import User from "../models/user-model.js";
import { createToken, verifyToken, type Payload } from "../utils/JWT.js";
import { BadRequestError } from "../utils/error.js";
import { User } from "../models/user-model.js";

/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const response = await authService.register({
    name,
    email,
    password,
    role,
  });

  if (response) formattedResponse(res, "User register successful.", 201);
});

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const response = await authService.login({ email, pass: password });

  formattedResponse(
    res,
    response.user,
    200,
    response.accessToken,
    response.refreshToken,
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
  if (!token) throw new BadRequestError("Refresh Token not found.");
  // get token from database
  const payload: Payload | undefined = verifyToken(token);
  if (!payload) throw new BadRequestError("Refresh Token is invalid.");
  const user = await User.findByPk(payload.userId);
  if (!user) {
    throw new BadRequestError("this user not found.");
  }
  // camper both token
  if (user.refreshToken === token) {
    const accessToken = createToken(
      payload.userId,
      payload.email,
      payload.role,
      60 * 15, // 15 min expiry
    );
    formattedResponse(res, "new access Token generated.", 201, accessToken);
  }
  // otherwise set loginState: false and delete
  user.refreshToken = "";
  user.loginStatus = false;
});

export { registerUser, loginUser };
