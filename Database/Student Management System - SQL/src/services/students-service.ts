import { Student } from "../model/student-model.js";
import { NotFoundError, UnknownError } from "../utils/error.js";

/**
 * register new Student.
 * @param name student's name
 * @param email student's email
 * @return new created student
 */
export const createStudent = async (name: string, email: string) => {
  try {
    const student = await Student.create({ name, email });
    return student;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get student by id.
 * @param studentId student's id
 * @return student details
 */
export const getStudentById = async (studentId: string) => {
  try {
    const student = await Student.findByPk(studentId);
    if (!student) throw new NotFoundError("Student With This id is not found.");
    return student;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * get all student.
 * @returns all student in Array
 */
export const getAllStudent = async () => {
  try {
    const student = await Student.findAll();
    return student;
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * update student By student id.
 * @returns new updated student details
 */
export const updateStudent = async (
  studentId: string,
  name?: string,
  email?: string,
) => {
  try {
    const student = await Student.findByPk(studentId);
    if (!student) throw new NotFoundError("this user dose not exist.");
    if (name) student.name = name;
    if (email) student.email = email;
    return await student.save();
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * delete student by id
 * @param studentId student Id
 */
export const deleteStudent = async (studentId: string) => {
  try {
    const student = await Student.destroy({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundError("This Student not found.");
    return student;
  } catch (error) {
    throw new UnknownError(error);
  }
};
