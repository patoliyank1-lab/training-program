import express from "express";
const router = express.Router();
import authRoute from "./auth-route.js";
import productRoute from "./product-route.js";
import orderRoute from "./order-route.js";
import { generateToken } from "../controllers/auth-controller.js";

router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/order", orderRoute);

router.get("/generate-token", generateToken)

export default router;
