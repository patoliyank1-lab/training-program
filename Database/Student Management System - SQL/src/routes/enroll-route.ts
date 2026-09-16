import express from "express";
import {
  enrollStudent,
  getOneStudentSub,
  getOneSubStudent,
  removeEnrollment,
} from "../controller/enroll-controller.js";

const router = express.Router();
// enroll student in course
router.post("/", enrollStudent);

// remove enrollment
router.delete("/:id", removeEnrollment);

// get student's all enroll course.
router.get("/course/:StudentId", getOneStudentSub);

// get one course's all enroll student.
router.get("/student/:CourseId", getOneSubStudent);

export default router;
