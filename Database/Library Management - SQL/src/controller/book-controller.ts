import { asyncHandler } from "../utils/async-handler.js";
import * as bookService from "../service/book-service.js";
import { formattedResponse } from "../utils/response.js";

/**
 * add new book in collection
 */
export const addBook = asyncHandler(async (req, res) => {
  const { title, author, category, charge, copies, price, published } =
    req.body;

  const response = await bookService.addBook({
    title,
    author,
    category,
    charge,
    copies,
    price,
    published,
  });

  if (response) formattedResponse(res, response, 201);
});

/**
 * get all books details.
 */
export const getAllBooks = asyncHandler(async (req, res) => {
  const response = await bookService.getAllBooks();

  if (response) formattedResponse(res, response, 201);
});
