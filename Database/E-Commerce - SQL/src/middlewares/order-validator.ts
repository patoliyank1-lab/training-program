import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { formatZodErrors } from "./auth-validator.js";
import { Product } from "../models/product-model.js";
// import Product from "../models/product-model.js";

// zod Validation schema for order item.
const orderItem = z
  .object({
    productId: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .uuidv4("Invalid productId."),
    quantity: z
      .number({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .min(1, "Min 1 quantity need."),
    orderId: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .uuidv4("Invalid productId."),
  })
  .strict();

// orderItem middleware for validate request body for orderItem .
export const OrderItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, quantity, orderId } = req.body;
    orderItem.parse({ productId, quantity, orderId });

    const product = await Product.findByPk(productId);
    if (product && product.stock && quantity >= product.stock) {
      throw new ConflictError(
        `Currently we have only ${product.stock} in stock.`,
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
