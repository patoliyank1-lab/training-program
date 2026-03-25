import { Types } from "mongoose";
import OrderItem from "../models/orderItem-model.js";
import Product from "../models/product-model.js";
import { ConflictError, NotFoundError } from "../utils/error.js";
import Order from "../models/order-model.js";

/**
 * create new orderItem.
 * @param productId product id
 * @param quantity quantity of product
 * @returns return new created orderItem.
 */
export const createOrderItem = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);

  if (!product) throw new NotFoundError("Product not found.");

  const currentPrice = product.price;

  const orderItem = new OrderItem({ productId, price: currentPrice, quantity });
  return (await orderItem.save()).toObject();
};

/**
 * create new Order.
 * @param userId LoggedIn User's Id
 * @param orderItem Array's of Order items.
 * @returns return new created Order Object.
 */
export const createOrder = async (userId: string, orderItem: string[]) => {
  //convert orderid to object id
  const OrderIds = orderItem.map((item) => new Types.ObjectId(item));
  const newOrderIds = new Set(OrderIds);
  const allProduct = await OrderItem.aggregate([
    {
      $match: {
        _id: {
          $in: Array.from(newOrderIds),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalProduct: { $sum: 1 },
        total: {
          $sum: { $ceil: { $multiply: ["$price", "$quantity"] } },
        },
      },
    },
  ]);

  const order = new Order({
    userId,
    oderItems: orderItem,
    totalPrice: allProduct[0].total,
  });
  return (await order.save()).toObject();
};

/**
 * complete order by OrderId and delete OrderItem.
 * @param orderId orderId
 * @returns
 */
export const completeOrder = async (orderId: string) => {
  //convert orderid to object Id
  const order = await Order.findById(orderId);
  if (!order) throw new NotFoundError("This Order is not found.");
  if(order.isComplete) throw new ConflictError("This Order is already complete.")
  order.isComplete = true;
  const orderItem = await OrderItem.updateMany(
    { _id: { $in: order.oderItems } },
    { $set: { isComplete: true } },
  );
  console.log(orderItem);
  order.isComplete = true;
  return (await order.save()).toObject();
};
