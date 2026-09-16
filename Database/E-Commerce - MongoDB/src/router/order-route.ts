import express from "express";
import {
    completeOrder,
  createOrder,
  createOrderItem,
  DailySalesReport,
  mostSoldProduct,
  totalRevenue,
} from "../controllers/order-controller.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import {
  OrderItemValidator,
  OrderValidator,
} from "../middlewares/order-validator.js";
import { isAdmin } from "../utils/isAdmin.js";
const router = express.Router();

router.post(
  "/order-item",
  OrderItemValidator,
  AuthMiddlewares,
  createOrderItem,
);

router.post("/order", OrderValidator, AuthMiddlewares, createOrder);

router.get("/complete/:id", AuthMiddlewares, completeOrder);
router.get("/revenue", AuthMiddlewares, isAdmin, totalRevenue);
router.get("/sold-product", AuthMiddlewares, isAdmin, mostSoldProduct);
router.get("/day-report", AuthMiddlewares, isAdmin, DailySalesReport);

export default router;
