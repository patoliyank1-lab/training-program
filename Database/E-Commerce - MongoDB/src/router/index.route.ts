import express from "express";
const router = express.Router();
import AuthRoute from "./AuthRoute.js";
import userRoute from "./userRoute.js";

router.use("/auth", AuthRoute);
router.use("/user", userRoute);

export default router;
