import { ZodError, ZodIssue } from "zod";
import { TErrorDetails, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError) : TGenericErrorResponse => {

  const errorDetails: TErrorDetails = {...err}

  let errorMessage =''

  err?.issues?.map((issue: ZodIssue) => issue.path).map(path => {
    return errorMessage = `${path} field required`;
  })

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails
  }
}

export default handleZodError;