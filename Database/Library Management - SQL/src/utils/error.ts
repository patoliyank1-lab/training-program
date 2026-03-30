/**
 * @throws Error with statusCode 400.
 */
class BadRequestError extends Error {
  statusCode: number;
  constructor(message = "Bad Request") {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

/**
 * @throws Error with statusCode 401.
 */
class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = "Unauthorized") {
    super(message);
    this.message = message;
    this.statusCode = 401;
  }
}

/**
 * @throws Error with statusCode 404.
 */
class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "item not found.") {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

/**
 * @throws Error with statusCode 409.
 */
class ConflictError extends Error {
  statusCode: number;
  constructor(message = "duplicate item found.") {
    super(message);
    this.message = message;
    this.statusCode = 409;
  }
}

export class UnknownError extends Error {
  statusCode: number;
  constructor(error: any) {
    super(error);
    if (error.message && error.statusCode) {
      this.message = error.message;
      this.statusCode = error.statusCode;
    }
    // For Validation Error
    else if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent.code == "23505") {
        this.message = error.errors[0].message;
        this.statusCode = 400;
      }
    }
    // for Invalid Input
    else if (error.name === "SequelizeDatabaseError") {
      if (error.original.code == "22P02") {
        this.message = "Invalid Id.";
        this.statusCode = 400;
      }
    }
  }
}

export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError };
