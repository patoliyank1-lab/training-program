import {
  generateToken,
  loginUser,
  registerUser,
} from "@/controller/auth-controller.js";
import express from "express";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/generate-token", generateToken);

export default router;
