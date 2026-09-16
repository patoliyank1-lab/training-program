import express from "express";
import {
  completeOrder,
  createOrder,
  createOrderItem,
  salesParUser,
  avgOrderValue,
  last7DaysOrders,
} from "../controllers/order-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import { OrderItemValidator } from "../middlewares/order-validator.js";
import { isAdmin } from "../utils/isAdmin.js";
const router = express.Router();

router.post(
  "/order-item",
  OrderItemValidator,
  AuthMiddlewares,
  createOrderItem,
);

router.get("/order", AuthMiddlewares, createOrder);

router.get("/complete/:id", AuthMiddlewares, completeOrder);

router.get("/sales-user", AuthMiddlewares, isAdmin, salesParUser);

router.get("/avg-orders", AuthMiddlewares, isAdmin, avgOrderValue);

router.get("/last-week-orders", AuthMiddlewares, isAdmin, last7DaysOrders);

export default router;
