import * as courseService from "../services/course-service.js";
import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { formattedResponse } from "../utils/response.js";

/**
 * create corse
 * @route POST /api/course/
 */
export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const course = await courseService.createCourse(name, description);
  formattedResponse(res, course, 201)
});

/**
 * create Many corse
 * @route POST /api/course/many/
 */
export const createManyCourse = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const course = await courseService.createManyCourse(name);
  formattedResponse(res, course, 201)
});

/**
 * get all course or get course by id
 * @route GET /api/course/
 * @param courseId to get only one course data by id
 */
export const getCourse = asyncHandler( async (req: Request, res: Response) => {
  const courseId = req.query.courseId as string | undefined;

  if (courseId) {
    const course = await courseService.findCourse(courseId);
  formattedResponse(res, course)
  } else {
    const course = await courseService.findAllCourse();
  formattedResponse(res, course)
  }
});

/**
 * update course by using course id.
 * @route PUT /api/course/:id
 */
export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const courseId = req.params.id as string | undefined;
  const { name } = req.body;

  if (!name) throw new BadRequestError("course name is not found.");

  if (!courseId) throw new BadRequestError("courseId is not given.");

  const course = await courseService.updateCourse(courseId, name);
   formattedResponse(res, course)
});

/**
 * delete course by using course id.
 * @route DELETE /api/course/:id
 */
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const courseId = req.params.id as string | undefined;

  if (!courseId) throw new BadRequestError("courseId is not given.");

  const course = await courseService.deleteCourse(courseId);
  formattedResponse(res, "course deleted successfully.")
});