import express from "express";
const router = express.Router();
import authRoute from "./auth-route.js";
import postRoute from "./post-route.js";
import userRoute from "./user-route.js";

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/user", userRoute);

export default router;
