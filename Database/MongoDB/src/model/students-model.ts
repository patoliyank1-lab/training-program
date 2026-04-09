import { Schema, model } from "mongoose";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: [64, "name must be less then 64 characters."],
    },
    age: {
      type: Number,
      require: true,
      min: [0, "age must be grater then 0."],
      max: [100, "age must be less then 100."],
    },
    email: {
      type: String,
      require: true,
      unique: [true, "This Email is already exist."],
      maxLength: [64, "email must be less then 64 characters."],
      match: [emailRegex, "Please fill a valid email address"],
    },
    course: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Students = model("Students", studentsSchema);
export default Students;
