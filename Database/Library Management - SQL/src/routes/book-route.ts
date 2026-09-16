import express from "express";
import {
  isLibrarian,
} from "../middlewares/role-middleware.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import { addBook, getAllBooks } from "../controller/book-controller.js";
const router = express.Router();

router.post("/", AuthMiddlewares, isLibrarian, addBook); // add book 
router.post("/", getAllBooks); //  list all books 

export default router;
