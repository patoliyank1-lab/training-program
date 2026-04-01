import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";
import * as transactionService from "../Services/transaction-services.js";

// controller for createTransaction for issue-book
export const createTransaction = async (req: Request, res: Response) => {
  const { userId, bookId, charge, dueDate } = req.body;

  if (!userId || !bookId || !charge || !dueDate)
    throw new BadRequestError("all value must be given.");

  const response = await transactionService.createTransaction({
    userId,
    bookId,
    charge,
    dueDate,
  });

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
};


// controller for completeTransaction for return-book
export const completeTransaction = async (req: Request, res: Response) => {
  const id = req.query.id as string | undefined;

  if (!id) throw new BadRequestError("id is not given.");

  const response = await transactionService.completeTransaction(id);

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
};


// get all BorrowedBook of user.
export const getBorrowedBook = async (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;

  if (!userId) throw new BadRequestError("userId is not given.");

  const response = await transactionService.getBorrowedBook(userId);

  res.status(200).json({
    success: true,
    status: 200,
    data: response,
  });
};
