import {
  createProfile,
  getAllUserLastPost,
  rankUserByPost,
  topPostByLike,
} from "@/controller/user-controller.js";
import { updateSetting } from "@/service/user-service.js";
import express from "express";
const router = express.Router();

router.post("/profile", createProfile);
router.put("/setting", updateSetting);
router.get("/user-post", rankUserByPost);
router.get("/post-like", topPostByLike);
router.get("/user-last-post", getAllUserLastPost);

export default router;
