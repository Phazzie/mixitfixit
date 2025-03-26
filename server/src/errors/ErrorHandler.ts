interface IErrorHandler {
    handleError(error: Error): ErrorResponse;
    logError(error: Error): void;
    formatError(error: Error): FormattedError;
}

export class ErrorHandler implements IErrorHandler {
    private readonly logger: ErrorLogger;
    private readonly formatter: ErrorFormatter;

    constructor(
        logger: ErrorLogger,
        formatter: ErrorFormatter
    ) {
        this.logger = logger;
        this.formatter = formatter;
    }

    handleError(error: Error): ErrorResponse {
        this.logError(error);
        const formatted = this.formatError(error);
        return new ErrorResponse(formatted);
    }

    logError(error: Error): void {
        this.logger.log(error);
    }

    formatError(error: Error): FormattedError {
        return this.formatter.format(error);
    }
}