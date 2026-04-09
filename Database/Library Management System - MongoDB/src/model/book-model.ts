import { Schema, model } from "mongoose";
import { kMaxLength } from "node:buffer";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      index: true,
      minLength: 3,
      maxLength: 50,
    },
    author: {
      type: String,
      require: true,
      index: true,
      minLength: 3,
      maxLength: 50,
    },
    category: {
      type: String,
      enum: [
        "fantasy",
        "sci-fi",
        "romance",
        "thriller",
        "mystery",
        "horror",
        "history",
      ],
      require: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      min: 0,
      require: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Book = model("Book", bookSchema);
export default Book;
