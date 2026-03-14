import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/error.js";

// Validator for register.
export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name must have more than 5 characters")
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must have max 50 and min 5 characters"),

  body("username")
    .notEmpty()
    .withMessage("Username must have more than 5 characters")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must have min 5 or max 15 characters")
    .matches(/^[a-z][a-z0-9_]{5,20}$/)
    .withMessage("Username is not Valid formate."),

  body("email")
    .notEmpty()
    .withMessage("email must have more than 5 characters")
    .isEmail()
    .withMessage("email is not Valid formate."),
  body("phone")
    .matches(/^\+?[1-9][0-9]{7,14}$/)
    .withMessage("Invalid phone number format"),
  body("password")
    .notEmpty()
    .withMessage("email must have more than 8 characters")
    .isLength({ min: 8, max: 20 })
    .withMessage("email must hav min 8 or max 20 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/)
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one digit and min 8 , max 20 char long",
    ),
];

// Validator for Login.
export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email must have more than 5 characters")
    .isEmail()
    .withMessage("email is not Valid formate."),

  body("password")
    .notEmpty()
    .withMessage("email must have more than 8 characters")
    .isLength({ min: 8, max: 20 })
    .withMessage("email must hav min 8 or max 20 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one digit and min 8 , max 20 char long",
    ),
];

export const AuthValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const Errors = errors.array().map((err) => err.msg);
    throw new BadRequestError(Errors[0]);
  }
  next();
};
