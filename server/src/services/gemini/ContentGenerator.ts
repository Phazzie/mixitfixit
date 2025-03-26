// Split content generation into more focused classes
class ModelInvoker {
  constructor(private readonly model: GenerativeModel) {}

  async invoke(prompt: string): Promise<GenerativeResponse> {
    return this.model.generateContent(prompt);
  }
}

class GenerationResultHandler {
  constructor(private readonly errorHandler: ErrorHandlingOrchestrator) {}

  handle(result: GenerativeResponse): Result<GenerativeResponse> {
    return success(result);
  }
}

import { Result } from '../types/Result';
import { ILogger } from '../types/ILogger';
import { ErrorHandlingOrchestrator } from './errors/ErrorHandlingOrchestrator';
import { ContentPolicyErrorHandler } from './errors/ContentPolicyErrorHandler';
import { PermissionErrorHandler } from './errors/PermissionErrorHandler';

export class ContentGenerator {
  private readonly errorOrchestrator: ErrorHandlingOrchestrator;

  constructor(
    private readonly modelInvoker: ModelInvoker,
    private readonly resultHandler: GenerationResultHandler,
    private readonly logger: ILogger
  ) {
    this.errorOrchestrator = new ErrorHandlingOrchestrator([
      new ContentPolicyErrorHandler(logger),
      new PermissionErrorHandler(logger)
    ], logger);
  }

  async generate(prompt: string): Promise<Result<GenerativeResponse>> {
    try {
      const response = await this.modelInvoker.invoke(prompt);
      return this.resultHandler.handle(response);
    } catch (error) {
      return this.errorOrchestrator.handle(error);
    }
  }
}


