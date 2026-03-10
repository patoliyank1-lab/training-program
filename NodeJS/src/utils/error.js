class BadRequestError extends Error {
    constructor(message = 'Bad Request' ){
        super(message);
        this.message = message
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized' ){
        super(message);
        this.message = message
        this.statusCode = 401;
    }
}

class NotFoundError extends Error {
    constructor(message = 'item not found.' ){
        super(message);
        this.message = message
        this.statusCode = 404;
    }
}

class ConflictError extends Error {
    constructor(message = 'duplicate item found.' ){
        super(message);
        this.message = message
        this.statusCode = 404;
    }
}

export {BadRequestError, UnauthorizedError, NotFoundError, ConflictError}