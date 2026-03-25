import express from "express";
import {
    completeOrder,
  createOrder,
  createOrderItem,
} from "../controllers/order-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import {
  OrderItemValidator,
  OrderValidator,
} from "../middlewares/order-validator.js";
const router = express.Router();

router.post(
  "/order-item",
  OrderItemValidator,
  AuthMiddlewares,
  createOrderItem,
);

router.post("/order", OrderValidator, AuthMiddlewares, createOrder);

router.get("/complete/:id", AuthMiddlewares, completeOrder);

export default router;
