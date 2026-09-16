import { ReturnDocument } from "mongodb";
import Book from "../model/book-model.js";
import Transaction from "../model/transaction-model.js";
import User from "../model/user-model.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.js";
import mongoose from "mongoose";

/**
 * issue book to user by creating transaction.
 * @param param0 - {bookId, userId, dueDate, charge} - details of transaction.
 * @returns object of created new transaction.
 */
export const createTransaction = async ({
  bookId,
  userId,
  dueDate,
  charge,
}: {
  bookId: string;
  userId: string;
  dueDate: Date;
  charge: string;
}) => {
  const book = await Book.findOne({ _id: bookId });
  if (!book) throw new NotFoundError("this book not found.");
  console.log(book.isAvailable);

  if (!book.isAvailable)
    throw new UnauthorizedError("this book is not Available");

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("this user is not found.");

  if (user.borrowed >= 5) {
    throw new BadRequestError("user can only borrowed 5 book at time.");
  }

  // create Transaction for issue book and update user and book status.
  const session = await mongoose.startSession();

  try {
    let newTran = {};
    await session.withTransaction(async () => {
      user.borrowed += 1;
      user.save();

      book.isAvailable = false;
      book.save();

      const transaction = new Transaction({
        bookId,
        userId,
        issueDate: new Date(),
        dueDate,
        charge,
      });
      newTran = await transaction.save();
    });
    console.log(newTran);
    return newTran;
  } catch (error) {
    console.error("Transaction failed:", error);
  } finally {
    session.endSession();
  }
};

/**
 * complete the created transaction.
 * @param transactionId - id of transaction
 * @returns new updated transaction.
 */
export const completeTransaction = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw new BadRequestError("Transaction id is not valid.");

  const book = await Book.findOne({ _id: transaction.bookId });
  const user = await User.findById(transaction.userId);

  if (book && user) {
    book.isAvailable = true;
    await book.save();

    user.borrowed = Math.max(0, user.borrowed - 1);
    await user.save();
  }
  transaction.isCompleted = true;
  return await transaction.save();
};

// get all borrowed books of one user by userId
export const getBorrowedBook = async (userId: string) => {
  console.log(userId);
  const books = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        isCompleted: false,
      },
    },
    {
      $group: {
        _id: "$userId",
        books: { $push: "$bookId" },
        totalBooks: { $sum: 1 },
        totalCharge: { $sum: "$charge" },
      },
    },
    {
      $lookup: {
        from: "books", // join with users collection
        localField: "books", // orders.userId
        foreignField: "_id", // users._id
        as: "books",
      },
    },
    {
      $lookup: {
        from: "users", // join with users collection
        localField: "_id", // orders.userId
        foreignField: "_id", // users._id
        as: "user",
      },
    },
    {
      $project: {
        _id: 0,
        user: 1,
        books: 1,
        totalBooks: 1,
        totalCharge: 1,
      },
    },
  ]);
  return books[0];
};
