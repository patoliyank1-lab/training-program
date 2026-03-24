import { deleteKeysByPattern } from "../config/redis-connect.js";
import Product from "../models/product-model.js";
import type { ProductType } from "../types/Types.js";
import { BadRequestError } from "../utils/error.js";

/**
 * create new product.
 * @param product - product details.
 * @returns new created product.
 */
export const createProduct = async (
  product: ProductType,
  createdBy: string,
) => {
  try {
    const newProduct = new Product({ ...product, createdBy });
    // remove cash data.
    deleteKeysByPattern("/api/product");
    return await newProduct.save();
  } catch (error: any) {
    throw new BadRequestError(error.massage);
  }
};

/**
 * find product by id and update quantity
 * @param quantity new product quantity.
 * @param productId product id.
 * @returns return new updated product.
 */
export const updateQuantity = async (quantity: number, productId: string) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: { quantity },
      },
      { returnDocument: "after" },
    ).lean();
    // remove cash data.
    deleteKeysByPattern("/api/product");
    return updatedProduct;
  } catch (error: any) {
    throw new BadRequestError(error.massage);
  }
};

/**
 * get all product with pagination
 * @param page number of page for product.
 * @param limit limits how many product in one page.
 */
export const getProduct = async (page: number, limit: number) => {
  const products = await Product.aggregate([
    { $match: { quantity: { $gt: 0 } } },
    {
      $facet: {
        products: [{ $skip: page * limit }, { $limit: limit }],
      },
    },
  ]);
  return products;
};
