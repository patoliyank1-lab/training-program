import express from "express";
import {
  completeTransaction,
  createTransaction,
  getBorrowedBook,
} from "../controllers/transaction-controller.js";
import {
  getAllAvailableBooks,
  getAllCategoryAvgValue,
  getAvgByCategory,
  getBookByCategory,
  isBookAvailable,
  searchBooksByAuthor,
  searchBooksByTitle,
} from "../controllers/book-controller.js";

const router = express.Router();

router.get("/by-category", getBookByCategory);
router.get("/avg-by-category", getAvgByCategory);
router.get("/avg-category-all", getAllCategoryAvgValue);
router.get("/available", getAllAvailableBooks);
router.get("/isAvailable", isBookAvailable);
router.get("/search-author", searchBooksByAuthor);
router.get("/search-title", searchBooksByTitle);

// Transaction
router.post("/issue-book", createTransaction);
router.get("/return-book", completeTransaction);
router.get("/borrowed-book", getBorrowedBook);

export default router;
