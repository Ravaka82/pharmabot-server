import {ApolloError} from "apollo-server-express";

class ErrorResponse extends Error {
    private statusCode: number;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const TryCatch = async (func, errorMessage = undefined) => {
    try { return await func() } catch(error) {
        console.error(error);
        return new ApolloError(errorMessage || error);
    }
}

export { ErrorResponse, TryCatch};
