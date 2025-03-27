import { Result, failure } from '../types/Result';
import { ILogger } from '../types/ILogger';

export abstract class BaseErrorHandler {
  constructor(protected readonly logger: ILogger) {}

  abstract canHandle(error: unknown): boolean;
  
  protected extractMetadata(error: unknown): Record<string, unknown> {
    return {
      details: (error as any)?.details ?? [],
      message: (error as any)?.message ?? '',
      stack: (error as any)?.stack ?? ''
    };
  }

  protected logError(context: string, error: unknown): void {
    this.logger.error(`${context}: ${(error as any)?.message ?? 'Unknown error'}`, {
      metadata: this.extractMetadata(error)
    });
  }
}