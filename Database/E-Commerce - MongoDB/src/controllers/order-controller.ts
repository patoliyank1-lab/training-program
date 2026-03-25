import { asyncHandler } from "../utils/async-handler.js";
import { formattedResponse } from "../utils/response.js";
import * as orderService from "../service/order-service.js";
import { BadRequestError } from "../utils/error.js";

/**
 * controller for create OrderItem.
 */
export const createOrderItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const response = await orderService.createOrderItem(productId, quantity);
  if (response) formattedResponse(res, response);
});

/**
 * controller for create Order.
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  const response = await orderService.createOrder(
    req.user?.userId as string,
    orderItems,
  );
  if (response) formattedResponse(res, response);
});

/**
 * controller for complete Order.
 */
export const completeOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id as string | undefined;
  if(!orderId) throw new BadRequestError("order id is not given")
  const response = await orderService.completeOrder(orderId);
  if (response) formattedResponse(res, response);
});
