import express from "express";
import authRoute from "./auth-route.js";
import bookRoute from "./book-route.js";
import issueRoute from "./issue-route.js";
import { generateToken } from "../controller/auth-controller.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/book", bookRoute);
router.use("/issue", issueRoute);

router.get("/generate-token", generateToken);
export default router;
