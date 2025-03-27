class GeminiClient implements IApiClient {
  constructor(
    private readonly apiKeyValidator: IApiKeyValidator,
    private readonly modelSelector: IModelSelector,
    private readonly logger: ILogger
  ) {}

  initialize(apiKey: string): Result<GenerativeModel> {
    const validationResult = this.apiKeyValidator.validate(apiKey);
    if (!validationResult.success) {
      return failure(validationResult.error);
    }

    try {
      const client = new GoogleGenerativeAI(apiKey);
      const model = this.modelSelector.select(client);
      return success(model);
    } catch (error) {
      this.logger.error('Failed to initialize Gemini client', error);
      return failure(new ClientInitializationError('Failed to initialize client'));
    }
  }
}

class RetryStrategy {
  private readonly maxRetries = 3;
  private readonly baseDelay = 1000;

  async execute<T>(
    operation: () => Promise<T>,
    attempt = 1
  ): Promise<Result<T>> {
    try {
      const result = await operation();
      return success(result);
    } catch (error) {
      if (attempt >= this.maxRetries) {
        return failure(new GeminiError('Max retries exceeded'));
      }
      
      await this.delay(attempt);
      return this.execute(operation, attempt + 1);
    }
  }

  private delay(attempt: number): Promise<void> {
    const delay = this.baseDelay * Math.pow(2, attempt - 1);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

class RateLimiter {
  private readonly requestsPerMinute = 60;
  private requests: number[] = [];

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(
      timestamp => now - timestamp < 60000
    );
    
    if (this.requests.length >= this.requestsPerMinute) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

class RequestBuilder {
  build(prompt: string): GenerateContentRequest {
    return {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };
  }
}

class ClientStateManager {
  private initialized = false;
  private model: GenerativeModel | null = null;

  setInitialized(model: GenerativeModel): void {
    this.initialized = true;
    this.model = model;
  }

  isInitialized(): boolean {
    return this.initialized && this.model !== null;
  }

  getModel(): Result<GenerativeModel> {
    if (!this.isInitialized()) {
      return failure(new ClientInitializationError('Client not initialized'));
    }
    return success(this.model!);
  }
}

