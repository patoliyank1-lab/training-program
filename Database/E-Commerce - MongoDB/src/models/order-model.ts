import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    oderItems: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "OrderItem",
          require: true,
        },
      ],
      validate: {
        validator: function (v: any[]) {
          return v && v.length >= 1; // Check if the array exists and has at least 1 item
        },
        message: "The items must contain at least one item.",
      },
    },
    totalPrice: {
      type: Number,
      min: 0,
      require: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Order = model("Order", orderSchema);
export default Order;
