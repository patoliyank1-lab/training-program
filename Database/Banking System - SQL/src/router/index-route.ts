import express from "express";
const router = express.Router();
import authRoute from "./auth-route.js";
import { generateToken } from "../controllers/auth-controller.js";
import transactionsRoute from "./transactions-route.js"

router.use("/auth", authRoute);

router.get("/generate-token", generateToken)

router.use("/transactions", transactionsRoute)

export default router;
