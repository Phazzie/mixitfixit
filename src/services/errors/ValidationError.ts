export class ValidationError extends Error {
    constructor(public code: string) {
        super(`Validation error: ${code}`);
        this.name = 'ValidationError';
    }
}
