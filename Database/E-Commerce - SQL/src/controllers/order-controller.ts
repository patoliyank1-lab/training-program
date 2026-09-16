import { asyncHandler } from "../utils/async-handler.js";
import { formattedResponse } from "../utils/response.js";
import * as orderService from "../service/order-service.js";
import { BadRequestError } from "../utils/error.js";

/**
 * controller for create OrderItem.
 */
export const createOrderItem = asyncHandler(async (req, res) => {
  const { productId, quantity, orderId } = req.body;
  const response = await orderService.createOrderItem(productId, quantity, orderId);
  if (response) formattedResponse(res, response);
});

/**
 * controller for create Order.
 */
export const createOrder = asyncHandler(async (req, res) => {
console.log("bbb");

  const response = await orderService.createOrder(
    req.user?.userId as string,
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

/**
 * sales Par User.
 */
export const salesParUser = asyncHandler(async (req, res) => {
  
  const response = await orderService.salesParUser();
  if (response) formattedResponse(res, response);
});

/**
 * get average order price and how many orders per user.
 */
export const avgOrderValue = asyncHandler(async (req, res) => {
  
  const response = await orderService.avgOrderValue();
  if (response) formattedResponse(res, response);
});

/**
 * get orders which is place in last Week.
 */
export const last7DaysOrders = asyncHandler( async(req, res) => {
  const response = await orderService.last7DaysOrders();
  if (response) formattedResponse(res, response);
});