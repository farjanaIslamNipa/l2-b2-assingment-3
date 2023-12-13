/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorDetails } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1]

  const statusCode = 400
  const errorMessage = `${extractedMessage} is already exists`
  const errorDetails : TErrorDetails = err

  return {
    statusCode,
    message: 'Duplicate value',
    errorMessage,
    errorDetails
  }
}

export default handleDuplicateError;