import mongoose, { Types } from "mongoose";
const connection = mongoose.connection;
import OrderItem from "../models/orderItem-model.js";
import Product from "../models/product-model.js";
import { ConflictError, NotFoundError } from "../utils/error.js";
import Order from "../models/order-model.js";
import { Logger } from "../middlewares/logger.js";

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
  if (order.isComplete)
    throw new ConflictError("This Order is already complete.");

  /**
   * create transaction
   * 1. find productId and stock by using aggregate.
   * 2. update product stock.
   * 3. set isComplete true in orderItem.
   * 4. set isComplete true in order.
   */
  const transaction = await connection
    .transaction(async () => {
      // get product details { productId , stock }
      const productDetails = await Order.aggregate([
        { $match: { _id: new Types.ObjectId(orderId) } },
        {
          $lookup: {
            from: "orderitems",
            localField: "oderItems",
            foreignField: "_id",
            as: "oderItems",
          },
        },
        { $unwind: "$oderItems" },
        {
          $lookup: {
            from: "products",
            localField: "oderItems.productId",
            foreignField: "_id",
            as: "Product",
          },
        },
        { $unwind: "$Product" },
        {
          $project: {
            _id: 0,
            productId: "$Product._id",
            quantity: "$oderItems.quantity",
          },
        },
      ]);
      // update stock
      const updates = productDetails.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { quantity: -item.quantity } },
        },
      }));

      await Product.bulkWrite(updates);
      // set isComplete true in orderItem.
      await OrderItem.updateMany(
        { _id: { $in: order.oderItems } },
        { $set: { isComplete: true } },
      );
      order.isComplete = true;
      // set isComplete true in order.
      return (await order.save()).toObject();
    })
    .catch((error) => {
      Logger.error(error.message);
      throw new Error(error);
    });
  return transaction;
};

/**
 * get revenue by category
 * @returns return array of object with total revenue, category, orderItem.
 */
export const totalRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $match: { isComplete: true },
    },
    // Join with all orderItem by using orderItemId
    {
      $lookup: {
        from: "orderitems",
        localField: "oderItems",
        foreignField: "_id",
        as: "orderItemDetails",
      },
    },
    { $unwind: "$orderItemDetails" },
    // join with product by using product id from orderItem.
    {
      $lookup: {
        from: "products",
        localField: "orderItemDetails.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    // now group all according category
    {
      $group: {
        _id: "$productDetails.category",
        totalRevenue: {
          $sum: {
            $ceil: {
              $multiply: [
                "$orderItemDetails.price",
                "$orderItemDetails.quantity",
              ],
            },
          },
        },
        totalOrdersItem: { $sum: 1 },
      },
    },
    { $sort: { totalRevenue: -1 } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalRevenue: 1,
        totalOrdersItem: 1,
      },
    },
  ]);

  return revenue;
};

/**
 * get most sold products.
 * @param limit how many product details want - {default - 3}
 */
export const mostSoldProduct = async (limit: number = 3) => {
  const product = await Order.aggregate([
    {
      $match: {
        isComplete: true,
      },
    },
    // Order --> OrderItem - to get items details and quantity
    {
      $lookup: {
        from: "orderitems",
        localField: "oderItems",
        foreignField: "_id",
        as: "Items",
      },
    },
    { $unwind: "$Items" },
    // OrderItem --> product - to get product Name.
    {
      $lookup: {
        from: "products",
        localField: "Items.productId",
        foreignField: "_id",
        as: "Product",
      },
    },
    { $unwind: "$Product" },
     // Group by product Id {_id,productName, totalSoldQuantity, totalRevenue }
    {
      $group: {
        _id: "$Product._id",
        productName: { $first: "$Product.title" },
        totalSoldQuantity: {
          $sum: "$Items.quantity",
        },
        totalRevenue: {
          $sum: {
            $ceil: {
              $multiply: ["$Items.price", "$Items.quantity"],
            },
          },
        },
      },
    },
    //sort by product soldOut
    {
      $sort: {
        totalSoldQuantity: -1,
      },
    },
    { $limit: limit },
  ]);
  return product;
};


/**
 * Daily sales report  {total-revenue, total-order, Date, customer-count}
 */
export const DailySalesReport = async () => {
  const product = Order.aggregate([
  { $match: { isComplete: true } },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      dailyRevenue: { $sum: "$totalPrice" },
      totalOrders: { $sum: 1 },
      uniqueCustomers: { $addToSet: "$userId" } // collect unique userIds
    }
  },
  {
    $project: {
      _id: 0,
      date: "$_id",
      dailyRevenue: 1,
      totalOrders: 1,
      uniqueCustomerCount: {
        $size: "$uniqueCustomers"
      }
    }
  },
  { $sort: { date: 1 } }
])
return product;
};

