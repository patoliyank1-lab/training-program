import { prisma } from "../config/database-connection.js";
import type { IssueType } from "../types/Types.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnknownError,
} from "../utils/error.js";

/**
 * issue new book
 * @param issue - {userId, BookId, returnDate, charge}
 * @returns return new created issue object
 */
export const issueBook = async (issue: IssueType) => {
  try {
    // check user's details and borrowedBooks
    const checkUser = await prisma.user.findFirst({
      where: { id: Number(issue.userId) },
    });
    if (!checkUser) throw new BadRequestError("UserId is not valid.");
    if (checkUser.borrowedBooks >= 5)
      throw new ConflictError("user at time only five books can borrow.");
    // check book's details and copies
    const checkBook = await prisma.book.findFirst({
      where: { id: Number(issue.bookId) },
    });
    if (!checkBook) throw new NotFoundError("BookIs is invalid.");
    if (checkBook.copies == 0)
      throw new ConflictError("This book in not available now.");

    const [, , issueDetails] = await prisma.$transaction([
      // increment borrowedBooks in user
      prisma.user.update({
        where: { id: Number(issue.userId) },
        data: {
          borrowedBooks: {
            increment: 1,
          },
        },
      }),
      // decrement copies in book
      prisma.book.update({
        where: {
          id: Number(issue.bookId),
        },
        data: {
          copies: {
            decrement: 1,
          },
        },
      }),
      // create new issue
      prisma.issue.create({
        data: {
          ...issue,
          userId: Number(issue.userId),
          bookId: Number(issue.bookId),
          charge: checkBook.charge,
        },
      }),
    ]);

    return issueDetails;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * return the book and complete transaction
 * @returns transition details
 */
export const returnBook = async (id: string) => {
  try {
    const transaction = await prisma.issue.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!transaction) throw new BadRequestError("Invalid issue Id.");
    const issue = await prisma.$transaction([
      prisma.user.update({
        where: { id: Number(transaction.userId) },
        data: {
            borrowedBooks:{
                decrement:1
            }
        },
      }),
       prisma.book.update({
        where: { id: Number(transaction.bookId) },
        data: {
            copies:{
                increment:1
            }
        },
      }),
      prisma.issue.update({
        where: { id: Number(id) },
        data: { isReturned: true },
      }),
    ]);
    return issue[2];
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get books which is borrowed by user.
 * @returns transition details
 */
export const borrowedByUser = async (userId: string) => {
  try {
    const issue = await prisma.issue.findMany({
      where: { userId: Number(userId) },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            id: true,
          },
        },
      },
    });

const merged = {
  userId: userId,
  totalRecords: issue.length,
  totalCharge: issue.reduce((sum, r) => sum + r.charge, 0),
  books: issue.map(r => ({
    borrowId: r.id,
    bookId: r.bookId,
    title: r.book.title,
    author: r.book.author,
    issueDate: r.issueDate,
    returnDate: r.returnDate,
    isReturned: r.isReturned,
    charge: r.charge
  }))
};
    return merged;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get users by number of borrow book.
 * @returns array of book
 */
export const userWithBorrowed = async (number:number = 2) => {
    console.log(number)
    const users = await prisma.user.findMany({
        where:{
            borrowedBooks:{
                gte: number
            }
        },
        select:{
          id:true,
          name:true,
          email:true,
          borrowedBooks:true,
        }
    })
  return users;
};
