import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    borrowed:{
        type:Number,
        default:0,
        min:0,
        max:[5, "max 5 books allow"],
    }
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
