import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from 'express'

// Validator for register.
export const registerValidator = [
  body('name')
    .isEmpty().withMessage('Name must have more than 5 characters')
    .isLength({ min: 5, max: 50 }).withMessage('Name must have max 50 and min 5 characters'),

  body('username')
    .isEmpty().withMessage('Username must have more than 5 characters')
    .isLength({ min: 5, max: 20 }).withMessage('Username must have min 5 or max 15 characters')
    .matches(/^[a-z][a-z0-9_]{5,20}$/).withMessage('Username is not Valid formate.'),

  body('email')
    .isEmpty().withMessage('email must have more than 5 characters')
    .isLength({ min: 5, max: 20 }).withMessage('email must hav min 5 or max 20 characters')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('email is not Valid formate.'),

  body('password')
    .isEmpty().withMessage('email must have more than 8 characters')
    .isLength({ min: 8, max: 20 }).withMessage('email must hav min 8 or max 20 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
];




// Validator for Login.
export const loginValidator = [
  body('email')
    .isEmpty().withMessage('email must have more than 5 characters')
    .isLength({ min: 5, max: 20 }).withMessage('email must hav min 5 or max 20 characters')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('email is not Valid formate.'),

  body('password')
    .isEmpty().withMessage('email must have more than 8 characters')
    .isLength({ min: 8, max: 20 }).withMessage('email must hav min 8 or max 20 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')

]



export const AuthValidator =    (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const errors = validationResult(req);
  console.log('errors---------',errors);
  

  if (!errors.isEmpty()) {
    const Errors = errors.array().map((err) => err.msg)
    return res.status(400).json({ errors: Errors[0] });
  }
  next();

}