import { sequelize } from "../config/database-connect.js";
import { Account } from "../models/account-model.js";
import { Transaction } from "../models/transaction-model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/error.js";
import { v4 as uuidv4 } from "uuid";

/**
 * transfer mony using transaction
 * 1. read both account balance
 * 2. withdrawal from sender account
 * 3. deposit in receiver account
 * 4. create new transaction document for both user which contain details about transaction
 */
export const transferOther = async (
  withdrawalAc: string,
  depositAc: string,
  amount: number,
  method: "UPI" | "BANK-TRANSFER",
) => {
  const t = await sequelize?.transaction();
  if (!t) throw new ConflictError("transaction can't be defined");
  try {
    // 1
    const withdrawal = await Account.findByPk(withdrawalAc, { transaction: t });
    if (!withdrawal) throw new NotFoundError("sender Account is not found!!");
    if (withdrawal.balance < amount) new ConflictError("Insufficient funds!!");

    const deposit = await Account.findByPk(depositAc, { transaction: t });
    if (!deposit) throw new NotFoundError("receiver Account is not found!!");

    // 2
    withdrawal.balance -= amount; // update sender balance
    withdrawal.save({ transaction: t });

    // 3
    deposit.balance += amount; // update receiver balance
    deposit.save({ transaction: t });

    // 4
    const referenceId = uuidv4();
    await Transaction.create(
      {
        reference_id: referenceId,
        account_id: withdrawalAc,
        method,
        type: "WITHDRAWAL",
        amount,
      },
      { transaction: t },
    );

    await Transaction.create(
      {
        reference_id: referenceId,
        account_id: depositAc,
        method,
        type: "DEPOSIT",
        amount,
      },
      { transaction: t },
    );

    t.commit();
    return {
      senderAc: withdrawalAc,
      receiverAc: depositAc,
      amount,
      ref_id: referenceId,
    };
  } catch (error) {
    t.rollback();
    throw new BadRequestError(`transaction felid by ${error}`);
  }
};

/**
 * transfer mony using transaction
 * 1. read both account balance
 * 2. withdrawal from  account
 * 3. create new transaction document for user
 */
export const withdrawalAmount = async (
  accountId: string,
  amount: number,
  method: "ATM" | "CASH",
) => {
  const t = await sequelize?.transaction();
  if (!t) throw new ConflictError("transaction can't be defined");
  try {
    // 1
    const withdrawal = await Account.findByPk(accountId, { transaction: t });
    if (!withdrawal) throw new NotFoundError("sender Account is not found!!");
    if (withdrawal.balance < amount) new ConflictError("Insufficient funds!!");

    // 2
    withdrawal.balance -= amount; // update sender balance
    withdrawal.save({ transaction: t });

    // 3
    await Transaction.create(
      {
        reference_id: null,
        account_id: accountId,
        method,
        type: "WITHDRAWAL",
        amount,
      },
      { transaction: t },
    );
    t.commit();
    return {
      accountNumber: accountId,
      amount,
    };
  } catch (error) {
    t.rollback();
    throw new BadRequestError(`transaction felid by ${error}`);
  }
};
