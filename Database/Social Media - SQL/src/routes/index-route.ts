import express from "express";
const router = express.Router();
import authRoute from "./auth-route.js";

router.use("/auth", authRoute);

export default router;
