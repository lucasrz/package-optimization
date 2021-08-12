export class ApiError extends Error {
    constructor(message = 'APIException') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}


