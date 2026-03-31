import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { formatZodErrors } from "./auth-validator.js";
// import Product from "../models/product-model.js";

// zod Validation schema for order item.
const orderItem = z
  .object({
    productId: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .length(24, "Invalid productId."),
    quantity: z
      .number({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .min(1, "Min 1 quantity need."),
  })
  .strict();

// orderItem middleware for validate request body for orderItem .
export const OrderItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, quantity } = req.body;
    orderItem.parse({ productId, quantity });

    const product = await Product.findById(productId);
    if (product && product.quantity && quantity >= product.quantity) {
      throw new ConflictError(
        `Currently we have only ${product.quantity} in stock.`,
      );
    }
    next();
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const zodError = formatZodErrors(error);
      throw new BadRequestError(
        `${zodError[0]?.field} -  ${zodError[0]?.message}`,
      );
    }
    throw new BadRequestError(error.message as string);
  }
};

// zod Validation schema for order.
const order = z
  .object({
    orderItems: z.array(z.string()).min(1, "Min 1 OrderItem given."),
  })
  .strict();

// order middleware for validate request body for order.
export const OrderValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderItems } = req.body;

    order.parse({ orderItems });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = formatZodErrors(error);
      throw new BadRequestError(
        `${zodError[0]?.field} -  ${zodError[0]?.message}`,
      );
    }
    throw new BadRequestError(error as string);
  }
};
