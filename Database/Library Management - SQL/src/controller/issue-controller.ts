import { asyncHandler } from "../utils/async-handler.js";
import * as issueService from "../service/issue-service.js";
import { formattedResponse } from "../utils/response.js";
import { BadRequestError } from "../utils/error.js";

/**
 * issue new book to user
 * @access LIBRARIAN and ADMIN
 */
export const issueBook = asyncHandler(async (req, res) => {
  const { userId, bookId, returnDate, charge } = req.body;

  const response = await issueService.issueBook({
    userId,
    bookId,
    returnDate,
    charge,
  });
  if (response) formattedResponse(res, response, 201);
});

/**
 * return book 
 * @access LIBRARIAN and ADMIN
 */
export const returnBook = asyncHandler(async (req, res) => {
  const id = req.params.id as string | undefined;

  if (!id) throw new BadRequestError("issue Id is not given.");

  const response = await issueService.returnBook(id);
  if (response) formattedResponse(res, response, 201);
});

/**
 * get borrowed book details by one specific user. 
 * @access LIBRARIAN and ADMIN
 */
export const borrowedByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId as string | undefined;

  if (!userId) throw new BadRequestError("issue Id is not given.");

  const response = await issueService.borrowedByUser(userId);
  if (response) formattedResponse(res, response, 201);
});

/**
 * get all user which is borrowed book more then given number or 2 
 * @access LIBRARIAN and ADMIN
 */
export const userWithBorrowed = asyncHandler(async (req, res) => {
  const number: number | undefined = Number(req.query.n) || 2;
  const response = await issueService.userWithBorrowed(number);
  if (response) formattedResponse(res, response, 201);
});
