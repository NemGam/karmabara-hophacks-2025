export class HttpError extends Error {
    constructor(public status: number, public override message: string) {
        super(message);
        status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(msg = 'Bad request') {
        super(400, msg);
    }
}

export class UnauthenticatedError extends HttpError {
    constructor(msg = 'Unauthenticated') {
        super(401, msg);
    }
}

export class InvalidCredentialsError extends HttpError {
    constructor(msg = 'Invalid credentials') {
        super(401, msg);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(msg = 'Unauthorized') {
        super(403, msg);
    }
}

export class NotFoundError extends HttpError {
    constructor(msg = 'Not Found') {
        super(404, msg);
    }
}

export class UserExistsError extends HttpError {
    constructor(msg = 'User with this email address already exists') {
        super(409, msg);
    }
}

export class NotImplementedError extends HttpError {
    constructor(msg = 'Method is not implemented') {
        super(501, msg);
    }
}
