import { asyncHandler } from "../utils/async-handler.js";
import { formattedResponse } from "../utils/response.js";
import * as transactionsService from "../service/transaction-service.js";
import { Account } from "../models/account-model.js";
import { NotFoundError } from "../utils/error.js";

/**
 * @description create new transaction and transfer to other user.
 * @route POST /api/transactions/send
 * @access user
 */
export const transferOther = asyncHandler(async (req, res) => {
  const {
    accountNumber,
    amount,
    method,
  }: {
    accountNumber: string;
    amount: number;
    method: "BANK-TRANSFER" | "UPI";
  } = req.body;

  const userAc = await Account.findOne({
    where: { user_id: req.user?.userId },
  });
  if (!userAc) throw new NotFoundError("Account not found.");

  const response = await transactionsService.transferOther(
    userAc.account_id,
    accountNumber,
    amount,
    method,
  );

  if (response) formattedResponse(res, response, 201);
});


/**
 * @description create new transaction and transfer to other user.
 * @route POST /api/transactions/withdrawal
 * @access user
 */
export const withdrawal = asyncHandler(async (req, res) => {
  const {
    amount,
    method,
  }: {
    accountNumber: string;
    amount: number;
    method: "ATM" | "CASH";
  } = req.body;
  const userAc = await Account.findOne({
      where: { user_id: req.user?.userId },
      
    });
    if (!userAc) throw new NotFoundError("Account not found.");
  const response = await transactionsService.withdrawalAmount(
    userAc.account_id,
    amount,
    method,
  );

  if (response) formattedResponse(res, response, 201);
});