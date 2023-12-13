import mongoose from "mongoose";
import { TErrorDetails, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorMessage = `${err?.errors?.title}`
  const errorDetails : TErrorDetails = err.errors

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails
  }
}

export default handleValidationError;