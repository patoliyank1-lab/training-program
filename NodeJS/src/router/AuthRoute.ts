// routes/auth.js
import express from "express";
import { loginUser, registerUser } from "../controllers/AuthCtr.js";
import {
  AuthValidator,
  loginValidator,
  registerValidator,
} from "../middlewares/AuthValidator.js";
import apiLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: Authenticates a user and generates a token
 *       operationId: loginUser
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: P@ssw0rd123!
 *       responses:
 *         '200':
 *           description: Authentication successful, returns a bearer token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: integer
 *                     example: 200
 *                   data:
 *                      type: string
 *                      example:  User Data in object form
 *                   Token:
 *                      type: string
 *                      example: mjkdsjinjs...
 *
 *         '401':
 *           description: Unauthorized - Invalid credentials
 *         '400':
 *           description: Bad request - Missing email or password
 */
router.post(
  "/login",
  apiLimiter(50, 30, "login"),
  loginValidator,
  AuthValidator,
  loginUser,
);

/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: Authenticates a user and generates a token
 *       operationId: registerUser
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - username
 *                 - email
 *                 - password
 *                 - confirmpassword
 *               properties:
 *                 name:
 *                   type: string
 *                   example: my name
 *                 username:
 *                   type: string
 *                   example: user1234
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: P@ssw0rd123!
 *                 confirmpassword:
 *                   type: string
 *                   example: P@ssw0rd123!
 *       responses:
 *         '200':
 *           description: Authentication successful, returns a bearer token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: integer
 *                     example: 200
 *                   data:
 *                      type: string
 *                      example:  User register successfully
 *         '401':
 *           description: Unauthorized - Invalid credentials
 *         '400':
 *           description: Bad request - Missing username or password
 */
router.post(
  "/register",
  apiLimiter(50, 30, "register"),
  registerValidator,
  AuthValidator,
  registerUser,
);
// router.get('/profile', getProfile)

export default router;
