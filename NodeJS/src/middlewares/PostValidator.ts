import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from 'express'
import { BadRequestError } from "../utils/error.js";

// Validator for post create.
export const postValidator = [
    body('title')
        .notEmpty().withMessage('Title must have more than 5 characters')
        .isLength({ min: 5, max: 50 }).withMessage('Title must have max 50 and min 5 characters'),

    body('description')
        .notEmpty().withMessage('description must have more than 10 characters')
        .isLength({ min: 10 }).withMessage('description must have min 10 characters')
        .isLength({ max: 1000 }).withMessage('description must have max 1000 characters'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            const Errors = errors.array().map((err) => err.msg)
            return res.status(400).json({ errors: Errors[0] });
        }
        next();
    }

];



// update post Validator

export const updatePostValidator = [
    body('title')
        .notEmpty().withMessage('Title must have more than 5 characters')
        .isLength({ min: 5, max: 50 }).withMessage('Title must have max 50 and min 5 characters'),

    body('description')
        .notEmpty().withMessage('description must have more than 10 characters')
        .isLength({ min: 10 }).withMessage('description must have min 10 characters')
        .isLength({ max: 1000 }).withMessage('description must have max 1000 characters'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const Errors = errors.array().map((err) => err.msg)
            throw new BadRequestError(Errors[0] as string);
        }
        next();
    }

];
