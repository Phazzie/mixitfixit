export interface IRateLimiter {
    canProceed(): boolean;
    getRemainingTime(): number;
    getMaxRequests(): number;
}