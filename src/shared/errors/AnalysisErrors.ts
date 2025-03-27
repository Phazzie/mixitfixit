class AnalysisError extends Error {
    constructor(
        message: string,
        readonly code: string,
        readonly context?: Record<string, unknown>
    ) {
        super(message);
    }
}

class ValidationError extends AnalysisError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR');
    }
}