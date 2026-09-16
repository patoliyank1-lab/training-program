import type { Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";
import * as BookService from "../Services/book-services.js";

// get all book by category
export const getBookByCategory = async (req: Request, res: Response) => {
  const category = req.query.category as (string | undefined);

  if (!category) throw new BadRequestError("category not found or not valid.");

  const books = await BookService.findBookByCategory(category);

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

// get average value of price of book by category
export const getAvgByCategory = async (req: Request, res: Response) => {
  const category = req.query.category as (string | undefined);

  if (!category) throw new BadRequestError("category not found or not valid.");

  const books = await BookService.getAvgByCategory(category);

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

// get average value of price of book by category for all book
export const getAllCategoryAvgValue = async (req: Request, res: Response) => {
  const books = await BookService.getAllCategoryAvgValue();

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

// get all Available Books 
export const getAllAvailableBooks = async (req: Request, res: Response) => {
  const books = await BookService.getAllAvailableBooks();

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

// check book is Available or not.
export const isBookAvailable = async (req: Request, res: Response) => {
  const name = req.query.name as (string | undefined);
  if (!name) throw new BadRequestError("book name is not given.");
  
  const books = await BookService.getAllAvailableBooks();

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

// search books by Author name.
export const searchBooksByAuthor = async (req: Request, res: Response) => {
  const search = req.query.search as (string | undefined);
  if (!search) throw new BadRequestError("search value is not given.");
  
  const books = await BookService.searchBooksByAuthor(search);

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};


// search books by title.
export const searchBooksByTitle = async (req: Request, res: Response) => {
  const search = req.query.search as (string | undefined);
  if (!search) throw new BadRequestError("search value is not given.");
  
  const books = await BookService.searchBooksByTitle(search);

  res.status(200).json({
    success: true,
    status: 200,
    data: books,
  });
};

