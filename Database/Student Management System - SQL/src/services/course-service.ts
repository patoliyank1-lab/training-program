import { Course } from "../model/course-model.js";
import { NotFoundError, UnknownError } from "../utils/error.js";

/**
 * create new Course
 * @param title Course Title
 * @param description Course description
 * @returns new created Course.
 */
export const createCourse = async (title: string, description?: string) => {
  try {
    const data: Record<string, any> = { title };
    if (description) data.description = description;
    const course = await Course.create(data);
    return course;
  } catch (error) {
    throw new UnknownError(error);
  }
};
/**
 * create many courses at one time
 * @param name array's of courses name
 */
export const createManyCourse = async (name: string[]) => {
  try {
    const data = name.map((item) => ({ title: item }));
    const course = await Course.bulkCreate(data);
    return course;
  } catch (error) {
    throw new UnknownError(error);
  }
};
/**
 * find courses details by course Id
 * @param courseId course Id
 * @returns course
 */
export const findCourse = async (courseId: string) => {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get all course details
 * @returns all course details in Array
 */
export const findAllCourse = async () => {
  try {
    const course = await Course.findAll();
    return course;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * update course by id.
 * @param courseId course Id
 * @param title new title of course
 * @param description new description of course
 */
export const updateCourse = async (
  courseId: string,
  title?: string,
  description?: string,
) => {
  try {
    const course = await Course.findByPk(courseId);
    if (!course) throw new NotFoundError("this course dose not exist.");
    if (title) course.title = title;
    if (description) course.description = description;
    return await course.save();
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * delete courses by Id.
 * @param courseId courses Id
 */
export const deleteCourse = async (courseId: string) => {
  try {
    const course = await Course.destroy({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundError("This course not found.");
    return course;
  } catch (error) {
    throw new UnknownError(error);
  }
};
