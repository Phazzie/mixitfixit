class LogLevelSelector {
  select(error: Error): string {
    if (error instanceof ValidationError) return 'warn';
    if (error instanceof RepositoryError) return 'error';
    return 'error';
  }
}

class LogMetadataCollector {
  collect(context: unknown): Record<string, unknown> {
    return {
      timestamp: new Date(),
      environment: process.env.NODE_ENV,
      context
    };
  }
}

class LogMessageBuilder {
  build(error: Error, metadata: Record<string, unknown>): string {
    return JSON.stringify({
      message: error.message,
      ...metadata
    });
  }
}

class LogPersister {
  constructor(private readonly logger: ILogger) {}

  persist(level: string, message: string): void {
    this.logger[level](message);
  }
}
