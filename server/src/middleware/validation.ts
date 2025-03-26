import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

interface StatementRequest {
  user1Statement: string;
  user2Statement: string;
}

export class ValidationMiddleware {
  static validateStatements(req: Request, res: Response, next: NextFunction): void {
    try {
      const { user1Statement, user2Statement } = req.body as StatementRequest;
      
      if (!user1Statement?.trim()) {
        throw new ValidationError('User 1 statement is required');
      }
      
      if (!user2Statement?.trim()) {
        throw new ValidationError('User 2 statement is required');
      }
      
      if (user1Statement.length > 1000 || user2Statement.length > 1000) {
        throw new ValidationError('Statements must be less than 1000 characters');
      }

      // Store validated data
      req.validatedData = { user1Statement, user2Statement };
      next();
    } catch (error) {
      next(error);
    }
  }
}