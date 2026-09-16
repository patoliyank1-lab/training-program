import { deleteKeysByPattern } from "../config/redis-connect.js";
import { Product } from "../models/product-model.js";
import { Op } from "sequelize";
import type { ProductType } from "../types/Types.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

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
    const updatedProduct = await Product.findByPk(productId);
    if (!updatedProduct) throw new NotFoundError("This Product not found.");
    updatedProduct.stock = quantity;
    // remove cash data.
    deleteKeysByPattern("/api/product");
    return updatedProduct.save();
  } catch (error: any) {
    throw new BadRequestError(error.massage);
  }
};

/**
 * get all product with pagination
 * @param page number of page for product.
 * @param limit limits how many product in one page.
 * @optional - { category, price, search }
 */
export const getProduct = async (
  page: number,
  limit: number,
  category?: string,
  price?: string,
  search?: string,
) => {
  const where: Record<string, any> = {
    stock: { [Op.gt]: 0 }, // only in-stock products
  };
  if (category) {
    where.category = category;
  }
  if (price) {
    const [minStr, maxStr] = price.split("-");
    const minPrice = Number(minStr);
    const maxPrice = Number(maxStr);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      where.price = { [Op.gte]: minPrice, [Op.lte]: maxPrice };
    }
  }
  if (search) {
    where.title = { [Op.iLike]: `%${search}%` };
  }
  const { rows: products, count: total } = await Product.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "DESC"]],
  });
  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
