import { Response } from "express";

export function returnSuccessfulResult(
  response: Response,
  data: object,
  message?: string,
  code?: number
) {
  return response.status(code ? code : 200).json({
    success: true,
    data,
    ...(message ? { message } : {}),
  });
}

export function returnErrorResult(
  response: Response,
  error: any,
  code?: number
) {
  return response.status(code ? code : 500).json({
    success: false,
    error,
  });
}

export function returnUnauthorizedResult(response: Response, message?: string) {
  return response.status(401).json({
    success: false,
    message: message ? message : "Unauthorized error",
  });
}
