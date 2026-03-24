import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { UserType } from "../types/Types.js";
import { BadRequestError } from "../utils/error.js";

/**
 * get zod error in format in Array form.
 * @param error zod Error
 * @returns return Error in format.
 */
function formatZodErrors(error: z.ZodError) {
  return error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
}

// zod Validation schema for register user.
const UserSchema = z
  .object({
    name: z
      .string()
      .min(3, "name must have min 3 character.")
      .max(32, "name must contain less then 32 character"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password cannot exceed 32 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()_+={}[\]|:;"'<,>.?/-]/, {
        message: "Password must contain at least one special character",
      }),
  })
  .strict();

// Auth middleware for validate request body for register user . 
export const UserValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: UserType = req.body;

    UserSchema.parse(user);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = formatZodErrors(error);
      throw new BadRequestError(
        `${zodError[0]?.field} -  ${zodError[0]?.message}`,
      );
    }
    throw new BadRequestError(error as string);
  }
};

// zod validation schema for login user.
const LoginUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password cannot exceed 32 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()_+={}[\]|:;"'<,>.?/-]/, {
        message: "Password must contain at least one special character",
      }),
  })
  .strict();

// Auth middleware for validate request body for login user . 
export const LoginUserValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: { email: string; password: string } = req.body;
    LoginUserSchema.parse(user);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = formatZodErrors(error);
      throw new BadRequestError(zodError[0]?.message);
    }
    throw new BadRequestError(error as string);
  }
};
