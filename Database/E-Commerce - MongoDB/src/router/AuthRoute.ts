import express from "express";
import { loginUser, registerUser } from "../controllers/AuthCtr.js";
import {
  AuthValidator,
  loginValidator,
  registerValidator,
} from "../middlewares/AuthValidator.js";
import apiLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post(
  "/login",
  apiLimiter(50, 30, "login"),
  loginValidator,
  AuthValidator,
  loginUser,
);

router.post(
  "/register",
  apiLimiter(50, 30, "register"),
  registerValidator,
  AuthValidator,
  registerUser,
);

export default router;
