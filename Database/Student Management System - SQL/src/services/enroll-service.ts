import { Course } from "../model/course-model.js";
import { Enrollment } from "../model/enrollments-model.js";
import { Student } from "../model/student-model.js";
import { NotFoundError, UnknownError } from "../utils/error.js";

/**
 * create new enrollment
 * @param studentId id of student
 * @param subjectId id of course
 * @returns new created enrollment details
 */
export const enrollStudent = async (studentId: string, subjectId: string) => {
    try {
        const course = await Enrollment.create({ StudentId: studentId, CourseId: subjectId });
        return course;
    } catch (error) {
        throw new UnknownError(error);
    }
};

/**
 * remove enrollment.
 * @param id id of enrollment
 */
export const removeEnrollment = async (id: string) => {
    try {
        const course = await Enrollment.destroy({
            where: { id },
        });
        if (!course) throw new NotFoundError("This course not found.");
        return course;
    } catch (error) {
        throw new UnknownError(error);
    }
};

/**
 * get all student details by course id.
 * @param CourseId course Id
 * return Array of student
 */
export const getOneSubStudent = async (CourseId: string) => {
   try {
        const course = await Enrollment.findAll({
            where: { CourseId },
            include: [Student]
        });
        return course;
    } catch (error) {
        throw new UnknownError(error);
    }
};

/**
 * get all course details by student  id.
 * @param StudentId course Id
 * return Array of Course
 */
export const getOneStudentSub = async (StudentId: string) => {
    try {
        const course = await Enrollment.findAll({
            where: { StudentId },
            include: [Course]
        });
        return course;
    } catch (error) {
        throw new UnknownError(error);
    }
};
