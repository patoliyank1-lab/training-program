import { asyncHandler } from "../utils/async-handler.js";
import { AuthService } from "../service/auth-service.js";

/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const response = await AuthService.register({
    name,
    email,
    password,
    role
  });

  if (response)
    res.status(201).json({
      success: true,
      status: 200,
      data: "User Successfully register.",
    });
});

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const response = await AuthService.login({ email, pass: password });

  res.status(200).json({
    success: true,
    status: 200,
    data: response.user,
    token: response.token,
  });
});

export { registerUser, loginUser };
