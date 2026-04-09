import express from "express";
import studentRoute from "./student-route.js"
import courseRoute from "./course-route.js"

const router = express.Router();

// student Routes
router.use("/student", studentRoute);

// course Routes
router.use("/course", courseRoute);

export default router;
