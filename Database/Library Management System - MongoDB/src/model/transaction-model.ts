import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    issueDate: {
      type: String,
      default: new Date().toLocaleString(),
    },
    dueDate: {
      type: String,
      require: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    charge: {
      type: Number,
      min: 0,
      require: true,
    },
  },
  { timestamps: true },
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
