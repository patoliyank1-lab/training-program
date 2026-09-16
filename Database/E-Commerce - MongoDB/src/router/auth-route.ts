import express from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js";
import {
  LoginUserValidate,
  UserValidate,
} from "../middlewares/auth-validator.js";
import apiLimiter from "../middlewares/rate-limiter.js";
import { setSellerRole } from "../middlewares/seller-middleware.js";

const router = express.Router();

router.post(
  "/login",
  apiLimiter(50, 30, "login"),
  LoginUserValidate,
  loginUser,
);

router.post(
  "/register",
  apiLimiter(50, 30, "register"),
  UserValidate,
  registerUser,
);

router.post(
  "/seller/register",
  apiLimiter(50, 30, "register"),
  UserValidate,
  setSellerRole,
  registerUser,
);
export default router;
