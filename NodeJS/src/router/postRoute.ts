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

const router = express.Router();

//post routes
router.get("/", apiLimiter(5, 30, "getPost"), getAllPost); // for get particular user post '/api/post?userId='
router.post(
  "/",
  apiLimiter(100, 30, "createPost"),
  AuthMiddlewares,
  postValidator,
  createNewPost,
);
router.get("/:id", apiLimiter(500, 30, "getPostById"), getPostById);
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
