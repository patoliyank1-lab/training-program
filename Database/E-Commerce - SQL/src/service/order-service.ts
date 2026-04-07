import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/error.js";
import { Product } from "../models/product-model.js";
import { OrderItem } from "../models/orderitem-model.js";
import { Order } from "../models/order-model.js";
import { sequelize } from "../config/database-connect.js";

/**
 * create new orderItem.
 * @param productId product id
 * @param quantity quantity of product
 * @returns return new created orderItem.
 */
export const createOrderItem = async (
  productId: string,
  quantity: number,
  orderId: string,
) => {
  // create Transaction
  const t = await sequelize?.transaction();
  if (!t) throw new ConflictError("transaction not be define");
  try {
    // check product is available or not.
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) throw new NotFoundError("Product not found.");

    // check Order Details.
    const order = await Order.findByPk(orderId, { transaction: t });
    if (!order) throw new NotFoundError("order id is not valid.");
    if (order.isComplete)
      throw new ConflictError(
        "This order is already complete can not add items.",
      );

    // update stock quantity
    product.stock -= quantity;
    product.save({ transaction: t });

    // update total price in order
    order.totalPrice += product.price * quantity;
    await order.save({ transaction: t });

    // create new orderItem
    const orderItem = new OrderItem({
      OrderId: orderId,
      ProductId: productId,
      price: product.price,
      quantity,
    });
    const OI = await orderItem.save({ transaction: t });

    t.commit();

    return OI;
  } catch (error) {
    t.rollback();
    throw new ConflictError(`Server Error: : ${error}`);
  }
};

/**
 * create new Order.
 * @param userId LoggedIn User's Id
 * @returns return new created Order Object.
 */
export const createOrder = async (userId: string) => {
  //convert orderid to object id

  const order = new Order({ UserId: userId });
  console.log(userId);
  return await order.save();
};

/**
 * complete order by OrderId and delete OrderItem.
 * @param orderId orderId
 * @returns
 */
export const completeOrder = async (orderId: string) => {
  const t = await sequelize?.transaction();
  if (!t) throw new ConflictError("transaction not be define");
  try {
    // convert orderid to object Id
    const order = await Order.findByPk(orderId, { transaction: t });
    if (!order) throw new NotFoundError("This Order is not found.");
    if (order.isComplete)
      throw new ConflictError("This Order is already complete.");
    /**
     * create transaction
     * 1. set isComplete true in orderItem.
     * 2. set isComplete true in order.
     */

    await OrderItem.update(
      {
        isComplete: true,
      },
      {
        where: { OrderId: orderId },
        transaction: t,
      },
    );

    order.isComplete = true;
    const updatedOrder = await order.save({ transaction: t });
    t.commit();
    return updatedOrder;
  } catch (error) {
    t.rollback();
    throw new BadRequestError(`Server Error: ${error}`);
  }
};

/**
 * get Total sales per user
 * @returns user details and number of buy product and total revenue
 */
export const salesParUser = async () => {
  try {
    // get users and total product he by and total revenue par user
    const user = (await sequelize?.query(`
    SELECT 
    u.id AS user_id,
    u.name,
    u.email,
	SUM(oi.quantity) AS total_quantity,
	SUM(
  ) AS total_revenue_per_user
	
	FROM public.users u
	JOIN public.orders o ON o."UserId" = u.id
	JOIN public.orderitems oi ON oi."OrderId" = o.id 
	JOIN public.products p ON oi."ProductId" = p.id
	GROUP BY u.id, u.name, u.email;
  `)) as unknown[];
    return user[0];
  } catch (error) {
    throw new BadRequestError(`ServerError: ${error}`);
  }
};

/**
 * Average order value per user
 * @returns user details and order avg price and count.
 */
export const avgOrderValue = async () => {
  try {
    // get users and total product he by and total revenue par user
    const user = (await sequelize?.query(`
    SELECT 
    u.id AS user_id,
    u.name,
    u.email,
	COUNT(o.id) AS orders,
	AVG(oi.price * oi.quantity) AS average_price_per_order
	
	FROM public.users u
	JOIN public.orders o ON o."UserId" = u.id
	JOIN public.orderitems oi ON oi."OrderId" = o.id 
	JOIN public.products p ON oi."ProductId" = p.id
	GROUP BY u.id, u.name, u.email;
  `)) as unknown[];
    return user[0];
  } catch (error) {
    throw new BadRequestError(`ServerError: ${error}`);
  }
};

/**
 * get last 7 day placed orders
 * @returns orders objects
 */
export const last7DaysOrders = async () => {
  try {
    // get users and total product he by and total revenue par user
    const user = (await sequelize?.query(`
SELECT * FROM public.orders o WHERE o."createdAt" >= NOW() - INTERVAL '7 days';`)) as unknown[];
    return user[0];
  } catch (error) {
    throw new BadRequestError(`ServerError: ${error}`);
  }
};
