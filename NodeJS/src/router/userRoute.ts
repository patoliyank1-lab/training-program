import express from "express";
import { followCtr, getFollowers, getFollowing } from "../controllers/userCtr.js";
import { AuthMiddlewares } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/** 
 * @description if user is following list then remove otherwise add in following.
 * @route GET /api/user/follow
 * @access only login User. 
 */
router.get('/follow', AuthMiddlewares ,followCtr)

/** 
 * @description give followers list of login user.
 * @route GET /api/user/follow
 * @access only login User. 
 */
router.get('/followers', AuthMiddlewares ,getFollowers)

/** 
 * @description give following list of login user.
 * @route GET /api/user/follow
 * @access only login User. 
 */
router.get('/following', AuthMiddlewares ,getFollowing)


export default router;