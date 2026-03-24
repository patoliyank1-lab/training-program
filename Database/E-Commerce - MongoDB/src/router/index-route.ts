import express from "express";
const router = express.Router();
import AuthRoute from "./auth-route.js";
import userRoute from "./use-route.js";

router.use("/auth", AuthRoute);
router.use("/user", userRoute);

export default router;
