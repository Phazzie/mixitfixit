import { NextFunction, Request, Response } from 'express';
import { BaseError, SystemError } from '../errors/baseErrors';
import { createErrorResponse } from '../types/ErrorResponse';
import { ILogger } from '../types/ILogger';

export function errorMiddleware(
  logger: ILogger
) {
  return (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const baseError = error instanceof BaseError 
      ? error 
      : new SystemError();

    logger.error(baseError.message, error);

    const response = createErrorResponse(baseError, {
      path: req.path,
      method: req.method
    });

    res.status(response.status).json(response);
  };
}