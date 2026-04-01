import { asyncHandler } from "../utils/async-handler.js";
import * as productService from "../service/product-service.js";
import type { ProductType } from "../types/Types.js";
import { formattedResponse } from "../utils/response.js";
import { BadRequestError } from "../utils/error.js";
import { setCache } from "../config/redis-connect.js";

/**
 * controller for create product.
 */
export const createProduct = asyncHandler(async (req, res) => {
  const product: ProductType = req.body;
  const response = await productService.createProduct(
    product,
    req.user?.userId as string,
  );
  if (response) formattedResponse(res, response);
});

/**
 * controller for get all product by pagination and price filter.
 */
export const getProduct = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const price = req.query.price as string | undefined;
  const category = req.query.category as string | undefined;
  const search = req.query.category as string | undefined;

  if (!/\d+-\d+/.test(price as string) && !(price === undefined)) {
    throw new BadRequestError("price must be in min-max format");
  }

  const response = await productService.getProduct(
    Math.min(1000, Math.max(0, page || 0)),
    Math.min(100, Math.max(1, limit || 1)),
    category,
    price,
    search,
  );
  setCache(req.originalUrl, response);
  if (response) formattedResponse(res, response);
});
