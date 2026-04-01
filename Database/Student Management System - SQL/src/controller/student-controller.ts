import * as studentService from "../services/students-service.js";
import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { formattedResponse } from "../utils/response.js";

/**
 * create student
 * @route POST /api/student/
 */
export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const student = await studentService.createStudent(name, email);
    formattedResponse(res, student, 201);
  },
);

/**
 * get all student or get student by id.
 * @route GET /api/student/:id
 * @param id student id
 */
export const getStudent = asyncHandler(async (req: Request, res: Response) => {
  const studentId = req.query.id as string | undefined;

  if (studentId) {
    const student = await studentService.getStudentById(studentId);
    formattedResponse(res, student);
  } else {
    const student = await studentService.getAllStudent();
    formattedResponse(res, student);
  }
});

/**
 * update student by using student id.
 * @route PUT /api/student/:id
 * @param id student id
 */
export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const studentId = req.params.id as string | undefined;
    const { name, email } = req.body;

    if (!name) throw new BadRequestError("student name is not found.");

    if (!studentId) throw new BadRequestError("studentId is not given.");

    const student = await studentService.updateStudent(studentId, name, email);
    formattedResponse(res, student);
  },
);

/**
 * delete student by using student id.
 * @route DELETE /api/student/:id
 * @param id student id
 */
export const deleteStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const studentId = req.params.id as string | undefined;

    if (!studentId) throw new BadRequestError("studentId is not given.");

    const student = await studentService.deleteStudent(studentId);

    formattedResponse(res, "student delete successfully.");
  },
);
