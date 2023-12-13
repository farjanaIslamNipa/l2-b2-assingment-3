/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorDetails } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessage = '';
  let errorDetails: TErrorDetails = {}

    if (err?.name === 'CastError'){
     const simplifiedError = handleCastError(err)
     statusCode = simplifiedError?.statusCode;
     message =simplifiedError?.message;
     errorMessage = simplifiedError.errorMessage;
     errorDetails = simplifiedError?.errorDetails;
    }else if(err instanceof ZodError) {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError?.statusCode;
      message =simplifiedError?.message;
      errorMessage = simplifiedError.errorMessage;
      errorDetails = simplifiedError?.errorDetails;
    }else if(err?.name === 'ValidationError'){
     const simplifiedError = handleValidationError(err)
     statusCode = simplifiedError?.statusCode;
     message =simplifiedError?.message;
     errorMessage = simplifiedError?.errorMessage;
     errorDetails = simplifiedError?.errorDetails;
    }else if (err?.code === 11000){
     const simplifiedError = handleDuplicateError(err)
     statusCode = simplifiedError?.statusCode;
     message =simplifiedError?.message;
     errorMessage = simplifiedError?.errorMessage;
     errorDetails = simplifiedError?.errorDetails;
    }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err?.stack 
  })
}

export default globalErrorHandler;