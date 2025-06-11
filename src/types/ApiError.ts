

class ApiError extends Error {
    statusCode: number;
    override message: string;
    success: boolean = false;
    
    data?: null;
    errors: string[];


    constructor(
        statusCode: number,
        message: string = "something went wrong",
        errors: string[] = [],
        stack?: string,

    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.success = false;
      
        if (this.stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, ApiError);
        }
    }
}


export {ApiError}