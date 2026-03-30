import express from "express";
import {
  isLibrarian,
} from "../middlewares/role-middleware.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import { addBook, getAllBooks } from "../controller/book-controller.js";
const router = express.Router();

router.post("/", AuthMiddlewares, isLibrarian, addBook); // ?  create book 
router.post("/", getAllBooks); // ?  create book 

export default router;
