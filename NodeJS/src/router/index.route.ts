import express from "express";
const router = express.Router();
import AuthRoute from "./AuthRoute.js";
import postRoute from "./postRoute.js";
import userRoute from "./userRoute.js";
import { avatarUpload, postImageUpload } from "../controllers/fileCtr.js";
import { AuthMiddlewares } from "../middlewares/AuthMiddleware.js";
import { upload } from "../utils/multer.js";
import emailRoute from "./emailRoute.js";
import chatRoute from "./chatRoute.js";

router.use("/auth", AuthRoute);
router.use("/post", postRoute);
router.use("/user", userRoute);

/**
 * @swagger
 * /api/upload/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [user]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string, example: "69b7efa711ecc1f486b05514" }
 *                 name: { type: string, example: "testUser" }
 *                 username: { type: string, example: "test123456" }
 *                 email: { type: string, example: "patoliya.nk1@gmail.com" }
 *                 phone: { type: string, example: "" }
 *                 role: { type: string, example: "user" }
 *                 isVerify: { type: boolean, example: true }
 *                 avatar: { type: string, example: "http://res.cloudinary.com/dvqs1k61h/image/upload/v1773738679/zkoa2inzlzo7ke3j0hi1.jpg" }
 *                 createdAt: { type: string, format: date-time }
 *                 updatedAt: { type: string, format: date-time }
 *                 __v: { type: integer, example: 0 }
 *       401:
 *         description: Unauthorized - Valid Bearer token required
 */
router.post(
  "/upload/avatar",
  AuthMiddlewares,
  upload.single("avatar"),
  avatarUpload,
);

/**
 * @swagger
 * /api/upload/post:
 *   post:
 *     summary: Upload post image
 *     tags: [post]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Post image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string, example: "69b7efa711ecc1f486b05514" }
 *                 title: { type: string, example: "title" }
 *                 description: { type: string, example: "test description" }
 *                 CreatedBy: { type: string, example: "69b4e21497e497f72464f312" }
 *                 likesCount: { type: integer, example: 0 }
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "69b4e21497e497f72464f312"
 *                 isPublished: { type: boolean, example: true }
 *                 image: { type: string, example: "http://res.cloudinary.com/dvqs1k61h/image/upload/v1773738679/zkoa2inzlzo7ke3j0hi1.jpg" }
 *                 createdAt: { type: string, format: date-time }
 *                 updatedAt: { type: string, format: date-time }
 *                 __v: { type: integer, example: 0 }
 *       401:
 *         description: Unauthorized - Valid Bearer token required
 */
router.post(
  "/upload/post",
  AuthMiddlewares,
  upload.single("image"),
  postImageUpload,
);

router.use("/email", emailRoute);
router.use("/chat", AuthMiddlewares, chatRoute);

export default router;
