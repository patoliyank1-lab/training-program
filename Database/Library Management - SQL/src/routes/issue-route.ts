import express from "express";
import { isLibrarian } from "../middlewares/role-middleware.js";
import { AuthMiddlewares } from "../middlewares/auth-middleware.js";
import {
  borrowedByUser,
  issueBook,
  returnBook,
  userWithBorrowed,
} from "../controller/issue-controller.js";
const router = express.Router();

router.post("/", AuthMiddlewares, isLibrarian, issueBook); // issue new Book
router.get("/books", AuthMiddlewares, isLibrarian, userWithBorrowed); // ? Users with more than 2 borrowed books.
router.get("/:id", AuthMiddlewares, isLibrarian, returnBook); // return Book

router.get("/books/:userId", AuthMiddlewares, isLibrarian, borrowedByUser); // ? Books borrowed by a user

export default router;
