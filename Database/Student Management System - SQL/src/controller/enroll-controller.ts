import { asyncHandler } from "../utils/async-handler.js";
import * as enrollService from "../services/enroll-service.js"
import { formattedResponse } from "../utils/response.js";
import { BadRequestError } from "../utils/error.js";

/**
 * enroll student in course.
 * @route POST /api/enroll/
 */
export const enrollStudent = asyncHandler(async (req, res) => {
    const { studentId, subjectId } = req.body;

    const response = await enrollService.enrollStudent(studentId, subjectId)
    formattedResponse(res, response)

});

/**
 * remove enrollment of student from course.
 * @route DELETE /api/enroll/:id
 */
export const removeEnrollment = asyncHandler(async (req, res) => {
    const id = req.params.id as string | undefined;
    if (!id) throw new BadRequestError("EnrollId not given");
    const response = await enrollService.removeEnrollment(id)
    formattedResponse(res, "Student remove successfully from course Enrollment.")
});

/**
 * get one subject's all enroll students.
 * @route GET /api/enroll/:CourseId
 */
export const getOneSubStudent = asyncHandler(async (req, res) => {
    const CourseId = req.params.CourseId as string | undefined;
    if (!CourseId) throw new BadRequestError("EnrollId not given");
    const response = await enrollService.getOneSubStudent(CourseId)
    formattedResponse(res, response)
});

/**
 * get one student's all enroll subject.
 * @route GET /api/enroll/:StudentId
 */
export const getOneStudentSub = asyncHandler(async (req, res) => {
    const StudentId = req.params.StudentId as string | undefined;
    if (!StudentId) throw new BadRequestError("EnrollId not given");
    const response = await enrollService.getOneStudentSub(StudentId)
    formattedResponse(res, response)
});
