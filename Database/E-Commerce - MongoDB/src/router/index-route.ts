import express from "express";
const router = express.Router();
import authRoute from "./auth-route.js";
import productRoute from "./product-route.js";

router.use("/auth", authRoute);
router.use("/product", productRoute);

export default router;
