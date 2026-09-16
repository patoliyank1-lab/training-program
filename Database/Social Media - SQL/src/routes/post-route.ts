import {
  getPostByHashtag,
  getPostBySearch,
  searchPosts,
} from "@/controller/post-controller.js";
import express from "express";
const router = express.Router();

router.get("/tag", getPostByHashtag);
router.get("/search-post", getPostBySearch);
router.get("/search", searchPosts);

export default router;
