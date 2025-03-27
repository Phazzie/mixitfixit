class LogFormatter {
  format(level: string, message: string, error?: unknown): string {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] ${level}: ${message}`;
    
    if (error) {
      return `${baseMessage} - ${this.formatError(error)}`;
    }
    
    return baseMessage;
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
