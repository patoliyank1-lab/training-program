import express from "express";
import {
  LoginUserValidate,
  UserValidate,
} from "../middlewares/auth-validator.js";
import { isAdmin, setLibrarianRole } from "../middlewares/role-middleware.js";
import { loginUser, registerUser } from "../controller/auth-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/login", LoginUserValidate, loginUser);

router.post("/register", UserValidate, registerUser);

router.post(
  "/librarian/register",
  UserValidate,
  AuthMiddlewares,
  isAdmin,
  setLibrarianRole,
  registerUser,
);

export default router;
