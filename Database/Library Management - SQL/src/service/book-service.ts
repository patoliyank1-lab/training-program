import { prisma } from "../config/database-connection.js";
import type { BookType } from "../types/Types.js";
import { ConflictError, UnknownError } from "../utils/error.js";

/**
 * create new book
 * @param book - details of book
 * @returns return new created book object
 */
export const addBook = async (book: BookType) => {
  try {
    const bookExist = await prisma.book.findFirst({
      where: { title: book.title },
    });

    if (!bookExist) throw new ConflictError("This book is already exist.");

    const newBook = await prisma.book.create({
      data: {
        ...book,
        price: parseFloat(book.price),
        charge: parseFloat(book.charge),
      },
    });
    return newBook;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get all books
 * @returns return Arrays book object
 */
export const getAllBooks = async () => {
  try {
    const book = await prisma.book.findMany();
    return book;
  } catch (error) {
    throw new UnknownError(error);
  }
};
