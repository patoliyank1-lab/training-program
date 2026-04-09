import express from "express";
const router = express.Router();
import { transferOther, withdrawal } from "../controllers/transaction-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";

router.post("/send", AuthMiddlewares, transferOther);

router.post("/withdrawal", AuthMiddlewares, withdrawal);

export default router;
