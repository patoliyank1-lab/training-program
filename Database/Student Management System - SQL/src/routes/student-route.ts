import express from "express";
import { createStudent, deleteStudent, getStudent, updateStudent } from "../controller/student-controller.js";

const router = express.Router();

router.get("/", getStudent ); // to get student by id give id in perms
router.post("/", createStudent); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;