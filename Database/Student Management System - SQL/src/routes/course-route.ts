import express from "express";
import { createCourse, createManyCourse, deleteCourse, getCourse, updateCourse } from "../controller/course-controller.js";

const router = express.Router();

router.get("/", getCourse ); // to get Course by id give CourseId in param
router.post("/", createCourse); 
router.post("/many", createManyCourse); 
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;