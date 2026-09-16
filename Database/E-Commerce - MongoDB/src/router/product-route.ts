import express from "express";
import {
  createProduct,
  getProduct,
} from "../controllers/product-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import { isSeller } from "../middlewares/seller-middleware.js";
import { createProductValidate } from "../middlewares/product-validator.js";
import { readCash } from "../middlewares/redis-cache.js";

const router = express.Router();

router.post(
  "/",
  createProductValidate,
  AuthMiddlewares,
  isSeller,
  createProduct,
);

router.get("/", readCash, getProduct);

export default router;
