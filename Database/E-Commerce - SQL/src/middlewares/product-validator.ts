import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { ProductType } from "../types/Types.js";
import { BadRequestError } from "../utils/error.js";
import { formatZodErrors } from "./auth-validator.js";

const category = [
  "Apparel",
  "Automotive",
  "Baby",
  "Beauty",
  "Electronics",
  "Food",
  "Home",
  "Toys",
  "Industrial",
];

// zod Validation schema for register user.
const productSchema = z
  .object({
    title: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .min(3, "name must have min 3 character.")
      .max(64, "name must contain less then 64 character"),
    description: z
      .string({
        error: (iss) =>
          iss.input === undefined ? "Field is required." : "Invalid input.",
      })
      .min(10, "name must have min 10 character.")
      .max(500, "name must contain less then 500 character"),
    category: z.enum(category, "category is not valid."),
    price: z
      .number("Price must be integer.")
      .min(0, "price can not be negative."),
    quantity: z
      .number("quantity must be integer.").int("quantity must be integer.")
      .min(0, "quantity can not be negative."),
  }, "product details is not given.")
  .strict();

// Auth middleware for validate request body for register user .
export const createProductValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product: ProductType = req.body;

    productSchema.parse(product);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = formatZodErrors(error);
      console.log(zodError);
      
      throw new BadRequestError(
        `${zodError[0]?.field} -  ${zodError[0]?.message}`,
      );
    }
    throw new BadRequestError(error as string);
  }
};
