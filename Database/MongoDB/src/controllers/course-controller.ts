import * as courseService from "../Services/course-service.js";
import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";

/**
 * create corse
 * @route POST /api/course/
 */
export const createCourse = async (req: Request, res: Response) => {
  const { name } = req.body;
  const course = await courseService.createCourse(name);
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: course,
  });
};

/**
 * create Many corse
 * @route POST /api/course/many/
 */
export const createManyCourse = async (req: Request, res: Response) => {
  const { name } = req.body;
  const course = await courseService.createManyCourse(name);
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: course,
  });
};

/**
 * get all course or get course by id
 * @route GET /api/course/
 * @param courseId to get only one course data by id
 */
export const getCourse = async (req: Request, res: Response) => {
  const courseId = req.query.courseId as string | undefined;

  if (courseId) {
    const course = await courseService.findCourse(courseId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: course,
    });
  } else {
    const course = await courseService.findAllCourse();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: course,
    });
  }
};

/**
 * update course by using course id.
 * @route PUT /api/course/:id
 */
export const updateCourse = async (req: Request, res: Response) => {
  const courseId = req.params.id as string | undefined;
  const { name } = req.body;

  if (!name) throw new BadRequestError("course name is not found.");

  if (!courseId) throw new BadRequestError("courseId is not given.");

  const course = await courseService.updateCourse(courseId, name);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: course,
  });
};

/**
 * delete course by using course id.
 * @route DELETE /api/course/:id
 */
export const deleteCourse = async (req: Request, res: Response) => {
  const courseId = req.params.id as string | undefined;

  if (!courseId) throw new BadRequestError("courseId is not given.");

  const course = await courseService.deleteCourse(courseId);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: "course delete successfully.",
  });
};
