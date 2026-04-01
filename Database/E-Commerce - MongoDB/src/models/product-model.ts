import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 64,
    },
    description: {
      type: String,
      require: true,
      minLength: 10,
      maxLength: 500,
    },
    category: {
      type: String,
      enum: [
        "Apparel",
        "Automotive",
        "Baby",
        "Beauty",
        "Electronics",
        "Food",
        "Home",
        "Toys",
        "Industrial",
      ],
      require: true,
    },
    price: {
      type: Number,
      min: 0,
      require: true,
    },
    quantity: {
      type: Number,
      min: 0,
      require: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productSchema.index({ name: "text", description: "text", category:"text" });

const Product = model("Product", productSchema);
export default Product;
