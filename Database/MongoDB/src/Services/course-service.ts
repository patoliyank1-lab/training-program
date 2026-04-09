import Course from "../model/course-model.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

/**
 * create new Course
 * @param name name of Course
 * @returns new created Course
 * @throws is course name is Falsy value then throw Error.
 */
export const createCourse = async (name: string) => {
  if(!name) throw new BadRequestError('course name is not valid.')
  const newCourse = new Course({ name });
  return (await newCourse.save()).toObject();
};

/**
 * create many Course at Ones.
 * @param Array - give all Course name in Array.
 * @returns all created Course's Array.
 */
export const createManyCourse = async (names: string[]) => {
  const CoursesName = names.map((item) => ({ name: item }));
  const newCourses = await Course.insertMany(CoursesName);
  return newCourses.map((item) => item.toObject());
};

/**
 * find Course by id and update.
 * @param id Course id.
 * @param name new name of Course.
 * @returns updated document.
 * @throws if Course not find then throw NotFoundError.
 */
export const updateCourse = async (id: string, name: string) => {
  const updatedCourse = await Course.findOneAndUpdate(
    { _id: id },
    {
      $set: { name },
    },
    { returnDocument: 'after' },
  ).lean();

  if (!updatedCourse) throw new NotFoundError("Course not found.");

  return updatedCourse;
};

/**
 * find Course by id and delete.
 * @param id Course id.
 * @returns deleted Course.
 * @throws if Course not find then throw NotFoundError.
 */
export const deleteCourse = async (id: string) => {
  const deletedCourse = await Course.findOneAndDelete({ _id: id }).lean();

  if (!deletedCourse) throw new NotFoundError("Course not found.");

  return deletedCourse;
};

/**
 * find Course by id and delete.
 * @param id Course id.
 * @returns acknowledged and deletedCount.
 */
export const deleteManyCourse = async (names: string[]) => {
  const deleteStatus = await Course.deleteMany({
    name: { $in: names },
  }).lean();
  return deleteStatus;
};

/**
 * find Course by id.
 * @param id Course id.
 * @returns Course which is find by id.
 * @throws if Course not find then throw NotFoundError.
 */
export const findCourse = async (id: string) => {
  const course = await Course.findOne({ _id: id }).lean();
  if (!course) throw new NotFoundError("Course not found.");
  return course;
};

/**
 * find All Course.
 * @returns Array of All Course.
 */
export const findAllCourse = async () => {
  const course = await Course.find({}).lean();
  return course;
};
