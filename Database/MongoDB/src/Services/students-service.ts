import Course from "../model/course-model.js";
import Students from "../model/students-model.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

/**
 * create new User with one Default courseId.
 * @param name name of student
 * @param age age of student
 * @param email email of student
 * @param courseIds Arrays of courseId.
 * @returns return new created student.
 * @throws if any filed is not given or invalid, courseId is invalid then throw Error.
 */
export const createStudent = async (
  name: string,
  age: number,
  email: string,
  courseIds: string[],
) => {
  if (courseIds.length == 0)
    throw new BadRequestError("Minimum one courseId is require.");

  // check course Id is valid or not.
  const result = await Course.find({
    _id: { $in: courseIds },
  })
    .select("_id")
    .lean();

  if (courseIds.length !== result.length)
    throw new BadRequestError(
      "Give Valid Object Id. any one or more is invalid.",
    );

  if (!name || !age || !email) {
    throw new BadRequestError("all filed must require");
  }

  try {
    const newStudent = new Students({ name, age, email, course: courseIds });
    const student = (await newStudent.save()).toObject();
    return student;
  } catch (error) {
    throw new BadRequestError(error as string);
  }
};

/**
 * update  User data by given userId.
 * @param studentId id of student which data want to update.
 * @param name name of student
 * @param age age of student
 * @param email email of student
 * @param courseIds Arrays of courseId.
 * @returns return new created student.
 * @throws if all filed is not given or invalid, courseId is invalid then throw Error.
 */
export const updateStudent = async (
  studentId: string,
  name?: string,
  age?: number,
  email?: string,
  courseIds?: string[],
) => {
  const updateValue: Record<string, any> = {};
  if (courseIds) {
    // check course Id is valid or not.
    const result = await Course.find({
      _id: { $in: courseIds },
    })
      .select("_id")
      .lean();

    if (courseIds.length !== result.length)
      throw new BadRequestError("Give Valid Object Id.");

    updateValue.course = result;
  }

  // if value is given then add to update Object.
  name && (updateValue.name = name);
  age && (updateValue.age = age);
  email && (updateValue.email = email);

  // if any value is not given then throw Error.
  if (Object.keys(updateValue).length === 0)
    throw new BadRequestError("any one filed must be given.");

  try {
    const newStudent = await Students.findOneAndUpdate(
      { _id: studentId },
      updateValue,
      { returnDocument: 'after' },
    ).lean();
    if (!newStudent) throw new NotFoundError("Student not Found.");
    return newStudent;
  } catch (error) {
    throw new BadRequestError(error as string);
  }
};

/**
 * delete student by student Id.
 * @param id id of student which data want to delete.
 * @returns return deleted student data.
 * @throws if student not found then throw Error.
 */
export const deleteStudent = async (id: string) => {
  const deletedStudent = await Students.findOneAndDelete({ _id: id }).lean();
  if (!deletedStudent) throw new NotFoundError("Students not found.");
  return deletedStudent;
};

/**
 * delete many student by student Id.
 * @param studentIds arrays of studentId.
 * @return acknowledged and deletedCount.
 * @throws if empty array given then throw Error..
 */
export const deleteManyStudent = async (studentIds: string[]) => {
  if (studentIds.length == 0)
    throw new BadRequestError("Minimum one studentId is require.");
  const deleteStatus = await Course.deleteMany({
    name: { $in: studentIds },
  }).lean();
  return deleteStatus;
};

/**
 * find student by id.
 * @param id student id.
 * @returns student details with Course name.
 * @throws if student not find then throw NotFoundError.
 */
export const getStudentById = async (id: string) => {
  const student = await Students.findOne({ _id: id })
    .populate("course", "-createdAt -updatedAt -__v")
    .lean();
  if (!student) throw new NotFoundError("Students not found.");
  return student;
};

/**
 * find All student.
 * @returns Array of All student.
 */
export const getAllStudent = async () => {
  const course = await Students.find({}).lean();
  return course;
};
