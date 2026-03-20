import * as studentService from "../Services/students-service.js";
import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";

/**
 * create student
 * @route POST /api/student/
 */
export const createStudent = async (req: Request, res: Response) => {
  const { name, age, email, course } = req.body;
  const student = await studentService.createStudent(name, age, email, course);
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: student,
  });
};

/**
 * get all student or get student by id.
 * @route GET /api/student/:id
 * @param id student id
 */
export const getStudent = async (req: Request, res: Response) => {
  const studentId = req.query.id as string | undefined;

  if (studentId) {
    const student = await studentService.getStudentById(studentId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: student,
    });
  } else {
    const student = await studentService.getAllStudent();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: student,
    });
  }
};

/**
 * update student by using student id.
 * @route PUT /api/student/:id
 * @param id student id
 */
export const updateStudent = async (req: Request, res: Response) => {
  const studentId = req.params.id as string | undefined;
  const { name, age, email, course } = req.body;

  if (!name) throw new BadRequestError("student name is not found.");

  if (!studentId) throw new BadRequestError("studentId is not given.");

  const student = await studentService.updateStudent(
    studentId,
    name,
    age,
    email,
    course,
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: student,
  });
};

/**
 * delete student by using student id.
 * @route DELETE /api/student/:id
 * @param id student id
 */
export const deleteStudent = async (req: Request, res: Response) => {
  const studentId = req.params.id as string | undefined;

  if (!studentId) throw new BadRequestError("studentId is not given.");

  const student = await studentService.deleteStudent(studentId);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: "student delete successfully.",
  });
};
