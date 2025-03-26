import { Result, failure } from '../types/Result';
import { GeminiError } from './GeminiError';
import { ILogger } from '../types/ILogger';
import { BaseErrorHandler } from './BaseErrorHandler';

export class ErrorHandlingOrchestrator {
  constructor(
    private readonly handlers: BaseErrorHandler[],
    private readonly logger: ILogger
  ) {}

  handle(error: unknown): Result<never> {
    for (const handler of this.handlers) {
      if (handler.canHandle(error)) {
        return handler.handle(error);
      }
    }

    this.logger.error('Unhandled Gemini error', error);
    return failure(new GeminiError('Gemini API error', 500));
  }
}