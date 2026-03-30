import express from "express";
import authRoute from "./auth-route.js";
import { generateToken } from "../controller/auth-controller.js";
const router = express.Router();

router.use("/auth", authRoute);

router.get("/generate-token", generateToken);
export default router;
