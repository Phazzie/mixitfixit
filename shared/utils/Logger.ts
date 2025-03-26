export class Logger {
  private static instance: Logger;
  
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  error(message: string, error?: Error): void {
    console.error({
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: error?.stack
    });
  }

  info(message: string, data?: unknown): void {
    console.log({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data
    });
  }
}

export const logger = Logger.getInstance();