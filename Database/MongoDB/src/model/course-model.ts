import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique:true,
      maxLength: [16, 'name must be less then 16 characters.']
    },
  },
  {
    timestamps: true,
  },
);

const Course = model("Course", courseSchema);
export default Course;
