export class ApiError extends Error {
    constructor(public code: string) {
        super(`API error: ${code}`);
        this.name = 'ApiError';
    }
}