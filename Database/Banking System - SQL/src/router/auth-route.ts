import express from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js";
import {
  LoginUserValidate,
  UserValidate,
} from "../middlewares/auth-validator.js";

const router = express.Router();

router.post(
  "/login",
  LoginUserValidate,
  loginUser,
);

router.post(
  "/register",
  UserValidate,
  registerUser,
);

router.post(
  "/seller/register",
  UserValidate,
  registerUser,
);
export default router;
