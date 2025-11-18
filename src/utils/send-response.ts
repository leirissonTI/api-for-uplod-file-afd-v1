import { Response } from 'express'
import { ApiResponse } from '../interfaces/response-interface'

export const sendResponse = <T>(response: Response, payload: ApiResponse<T>): Response => {
  return response.status(payload.statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
    error: payload.error,
  })
} 