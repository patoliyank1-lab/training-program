import express from "express";
import bookRoute from "./books-route.js"

const router = express.Router();

router.use("/books", bookRoute)

export default router;
