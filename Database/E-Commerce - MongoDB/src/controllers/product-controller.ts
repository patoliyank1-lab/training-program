import { asyncHandler } from "../utils/async-handler.js";
import * as productService from "../service/product-service.js";
import type { ProductType } from "../types/Types.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product: ProductType = req.body;
  const response = await productService.createProduct(
    product,
    req.user?.userId as string,
  );
  if (response)
    res.status(201).json({
      success: true,
      status: 200,
      data: response,
    });
});
