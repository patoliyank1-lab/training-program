import express from "express";
import { verifyTokenEmail } from "../controllers/emailCtr.js";

const router = express.Router();

/** 
 * @description verify user using like which is send on email.
 * @route GET /api/email/verify
 * @access new register user. 
 */
router.get("/verify", verifyTokenEmail);

export default router;
