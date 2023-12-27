export type TErrorDetails = Record<string, unknown>


export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: TErrorDetails
}
