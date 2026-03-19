import express from "express";
import {
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
  createNewPost,
  likePost,
  removeLikePost,
} from "../controllers/postCtr.js";
import {
  postValidator,
  updatePostValidator,
} from "../middlewares/PostValidator.js";
import { AuthMiddlewares } from "../middlewares/AuthMiddleware.js";
import { isAdmin } from "../utils/isAdmin.js";
import apiLimiter from "../middlewares/rateLimiter.js";
import { readCash } from "../middlewares/redisCache.js";

const router = express.Router();

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: "get all post and this route is open for all"
 *     operationId: "post"
 *     tags:
 *       - "post"
 *     parameters:
 *       - name: "userId"
 *         in: "query"
 *         description: "this is use to get all post of one specific user."
 *         schema:
 *           type: "string"
 *           example: "69b7e..."
 *       - name: "page"
 *         in: "query"
 *         description: "this is use to get page of post."
 *         schema:
 *           type: "integer"
 *           example: 2
 *       - name: "limit"
 *         in: "query"
 *         description: "this params controls how many post come on one page."
 *         schema:
 *           type: "integer"
 *           example: 10
 *       - name: "likes"
 *         in: "query"
 *         description: "this is filter post by like and it syntax must be in min-max."
 *         schema:
 *           type: "string"
 *           example: "10-20"
 *     responses:
 *       '200':
 *         description: "in response we receive post by given response example."
 *         content:
 *           application/json:
 *             schema:
 *                properties:
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
 *       '401':
 *         description: "Unauthorized - Invalid credentials"
 *       '400':
 *         description: "Bad request - Missing username or password"
 */
router.get("/", apiLimiter(500, 30, "getPost"), readCash, getAllPost); // for get particular user post '/api/post?userId='

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: "Create a new post"
 *     description: "This endpoint creates a new post. Requires a Bearer Token in the Authorization header."
 *     operationId: "createPost"
 *     tags:
 *       - "post"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "title"
 *               - "description"
 *             properties:
 *               title:
 *                 type: "string"
 *                 example: "Principal Security Consultant"
 *               description:
 *                 type: "string"
 *                 example: "test description"
 *     responses:
 *       '200':
 *         description: "Post created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: true
 *                 status:
 *                   type: "integer"
 *                   example: 200
 *                 data:
 *                   type: "object"
 *                   properties:
 *                     title:
 *                       type: "string"
 *                       example: "Legacy Interactions Administrator"
 *                     description:
 *                       type: "string"
 *                       example: "test description"
 *                     image:
 *                       type: "string"
 *                       example: ""
 *                     CreatedBy:
 *                       type: "string"
 *                       example: "69b8e2b8b5f3c5cb13a869ef"
 *                     likesCount:
 *                       type: "integer"
 *                       example: 0
 *                     likes:
 *                       type: "array"
 *                       items:
 *                         type: "string"
 *                       example: []
 *                     isPublished:
 *                       type: "boolean"
 *                       example: false
 *                     _id:
 *                       type: "string"
 *                       example: "69b8e8992cdf646d3433ead1"
 *                     createdAt:
 *                       type: "string"
 *                       format: "date-time"
 *                       example: "2026-03-17T05:37:29.410Z"
 *                     updatedAt:
 *                       type: "string"
 *                       format: "date-time"
 *                       example: "2026-03-17T05:37:29.410Z"
 *                     __v:
 *                       type: "integer"
 *                       example: 0
 *       '401':
 *         description: "Unauthorized - Bearer token missing or invalid"
 */
router.post(
  "/",
  apiLimiter(100, 30, "createPost"),
  AuthMiddlewares,
  postValidator,
  createNewPost,
);
router.get("/:id", apiLimiter(500, 30, "getPostById"), getPostById);

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: "Update an existing post"
 *     description: "This endpoint updates a post by its ID. Requires a Bearer Token in the Authorization header."
 *     operationId: "updatePost"
 *     tags:
 *       - "post"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "The ID of the post to update"
 *         schema:
 *           type: "string"
 *           example: "69b7a4db4b32fa68e1f09e41"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               title:
 *                 type: "string"
 *                 example: "Customer Division Technician"
 *               description:
 *                 type: "string"
 *                 example: "test description"
 *     responses:
 *       '200':
 *         description: "Post updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: true
 *                 status:
 *                   type: "integer"
 *                   example: 200
 *                 data:
 *                   type: "object"
 *                   properties:
 *                     image:
 *                       type: "string"
 *                       example: ""
 *                     _id:
 *                       type: "string"
 *                       example: "69b7a4db4b32fa68e1f09e41"
 *                     title:
 *                       type: "string"
 *                       example: "District Security Producer - 2"
 *                     description:
 *                       type: "string"
 *                       example: "This is a test description for the District Security Producer - 2."
 *                     CreatedBy:
 *                       type: "string"
 *                       example: "69b4e21497e497f72464f312"
 *                     likesCount:
 *                       type: "integer"
 *                       example: 0
 *                     likes:
 *                       type: "array"
 *                       items:
 *                         type: "string"
 *                       example: []
 *                     isPublished:
 *                       type: "boolean"
 *                       example: false
 *                     createdAt:
 *                       type: "string"
 *                       format: "date-time"
 *                       example: "2026-03-16T06:36:11.196Z"
 *                     updatedAt:
 *                       type: "string"
 *                       format: "date-time"
 *                       example: "2026-03-16T10:28:48.319Z"
 *                     __v:
 *                       type: "integer"
 *                       example: 0
 *       '401':
 *         description: "Unauthorized - Token missing or invalid"
 *       '404':
 *         description: "Post not found"
 */
router.put(
  "/:id",
  apiLimiter(100, 30, "updatePostById"),
  AuthMiddlewares,
  updatePostValidator,
  updatePostById,
);
router.delete(
  "/:id",
  apiLimiter(100, 30, "deletePostById"),
  AuthMiddlewares,
  isAdmin,
  deletePostById,
);

router.get(
  "/like/:id",
  apiLimiter(500, 30, "LikePost"),
  AuthMiddlewares,
  likePost,
);
router.get(
  "/dislike/:id",
  apiLimiter(500, 30, "LikePost"),
  AuthMiddlewares,
  removeLikePost,
);

export default router;
