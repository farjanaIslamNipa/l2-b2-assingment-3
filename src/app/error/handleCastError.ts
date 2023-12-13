import mongoose from "mongoose";
import { TErrorDetails, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

  const errorDetails: TErrorDetails = {
    stringValue: (err?.stringValue)?.replace(/"/g, ''),
    valueType: 'string',
    kind: err?.kind,
    value: err?.value,
    path: err?.path,
    reason: err?.reason as object,
    name: err?.name,
    message: err?.message
  }
  const errorMessage = `${errorDetails?.value} is not a valid ID!`

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails
  }
}

export default handleCastError;