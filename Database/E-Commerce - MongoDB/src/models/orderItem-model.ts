import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    quantity: {
      type: Number,
      min: 0,
      require: true,
    },
    isComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const OrderItem = model("OrderItem", orderItemSchema);
export default OrderItem;
