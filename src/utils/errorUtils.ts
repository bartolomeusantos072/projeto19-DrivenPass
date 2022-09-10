type TAppError = "wrong_schema" | "not_found" | "conflict" | "unauthorized" | 'bad_request';

export interface IError {
    type: TAppError,
    message: string;
}

export function isError(error: object): error is IError {
    return (error as IError).type != undefined;
}

export function errorTypeToStatusCode(type: TAppError) {
    let statusCode: number;
    switch (type) {
        case 'not_found':
            statusCode = 404;
            break;
        case 'wrong_schema':
            statusCode = 422;
            break;
        case 'bad_request':
            statusCode = 400;
            break;
        case 'unauthorized':
            statusCode = 401;
            break;
        case 'conflict':
            statusCode = 409;
        default:
            statusCode = 500;
    }
    return statusCode;
}

export function conflictError(message?: string): IError {
    return { type: "conflict", message };
}

export function notFoundError(message?: string): IError {
    return { type: "not_found", message };
}

export function unauthorizedError(message?: string): IError {
    return { type: "unauthorized", message };

} 

export function wrongSchemaError(message?: string): IError {
    return { type: "wrong_schema", message };
} 

export function badRequestError(message?: string): IError {
    return { type: "bad_request", message };
}