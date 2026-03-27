import express from "express";
import studentRoute from "./student-route.js"
import courseRoute from "./course-route.js"
import enrollRoute from "./enroll-route.js"

const router = express.Router();

// student Routes
router.use("/student", studentRoute);

// course Routes
router.use("/course", courseRoute);

// enrollment Routes
router.use("/enroll", enrollRoute);

export default router;