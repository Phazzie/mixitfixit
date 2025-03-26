import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

export class ErrorHandlerMiddleware {
  static handle(error: Error, req: Request, res: Response, next: NextFunction): void {
    // Log error for monitoring
    console.error(`[${new Date().toISOString()}] ${error.stack}`);

    if (error instanceof ValidationError) {
      res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
      return;
    }

    if (error.name === 'GeminiError') {
      res.status(502).json({
        error: 'AI Service Error',
        message: 'Failed to process statements'
      });
      return;
    }

    // Default error
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    });
  }
}