import Book from "../model/book-model.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

const Category = [
  "fantasy",
  "sci-fi",
  "romance",
  "thriller",
  "mystery",
  "horror",
  "history",
];

/**
 * get book by category
 * @param category category of books
 * @returns Arrays of match Books
 * @throws if give invalid category then throw Error
 */
export const findBookByCategory = async (category: string) => {
  const isValid = Category.find((i) => i === category);
  if (!isValid) throw new BadRequestError("This Category is not Valid.");
  const books = await Book.aggregate([
    { $match: { category } },
    { $sort: { title: 1 } },
  ]);
  return books;
};

/**
 * get all books price average by category for one given category
 * @param category category of books
 * @returns category name and that category's all book price average.
 * @throws if give invalid category then throw Error
 */
export const getAvgByCategory = async (category: string) => {
  const isValid = Category.find((i) => i === category);
  if (!isValid) throw new BadRequestError("This Category is not Valid.");
  const books = await Book.aggregate([
    { $match: { category } },
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" },
        totalBooks: { $sum: 1 },
      },
    },
  ]);
  console.log(books);

  return books;
};

/**
 * get all books price average by category for all category.
 * @returns Array of Category object which is contain category name and average price.
 */
export const getAllCategoryAvgValue = async () => {
  const books = await Book.aggregate([
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" },
        totalBooks: { $sum: 1 },
      },
    },
  ]);
  console.log(books);
  return books;
};

/**
 * get all Available books
 * @return give Arrays of total available books.
 */
export const getAllAvailableBooks = async () => {
  const books = await Book.aggregate([
    {
      $match: {
        isAvailable: true,
      },
    },
  ]);
  console.log(books);
  return books;
};

/**
 * check book is Available or not.
 * @param title book title
 * @returns boolean if book Available the true otherwise false.
 */
export const isBookAvailable = async (title: string) => {
  const isAvailable = await Book.aggregate([{ $match: { title } }]);
  if (isAvailable.length === 0)
    throw new BadRequestError("can not find this book.");
  console.log(isAvailable[0].isAvailable);
  return isAvailable[0].isAvailable;
};

/**
 * get book by author name.
 * @param authorName name of author.
 * @returns Array of matching Books
 */
export const searchBooksByAuthor = async (authorName: string) => {
  const books = await Book.aggregate([
    {
      $match: {
        author: { $regex: authorName, $options: "i" },
      },
    },
  ]);
  console.log(books);
  return books;
};

/**
 * get book by title
 * @param title title of book.
 * @returns Array of matching Books
 */
export const searchBooksByTitle = async (title: string) => {
  const books = await Book.aggregate([
    {
      $match: {
        title: { $regex: title, $options: "i" },
      },
    },
  ]);
  console.log(books);
  return books;
};

/**
 * update book Available status.
 * @param title book title case sensitive
 * @param status Available or not Available status in boolean 
 * @returns return new updated document of book
 */
export const updateBookStatus = async (title: string, status: boolean) => {
  const updatedBook = await Book.findOneAndUpdate(
    { title },
    { $set: { isAvailable: status } },
    { returnDocument: "after" },
  ).lean();

  if (!updatedBook) throw new NotFoundError("this book is not found");
  console.log(updatedBook);
  return updatedBook;
};
