import express from "express";
import { followCtr, getFollowers, getFollowing } from "../controllers/userCtr.js";
import { AuthMiddlewares } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get('/follow', AuthMiddlewares ,followCtr)
router.get('/followers', AuthMiddlewares ,getFollowers)
router.get('/following', AuthMiddlewares ,getFollowing)


export default router;