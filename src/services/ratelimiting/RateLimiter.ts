export class RateLimiter implements IRateLimiter {
    private readonly window: number = 60000; // 1 minute
    private readonly requests: number[] = [];

    constructor(
        private readonly maxRequests: number,
        private readonly logger: ILogger
    ) {}

    canProceed(): boolean {
        const now = Date.now();
        this.cleanup(now);
        
        if (this.requests.length >= this.maxRequests) {
            this.logger.debug('Rate limit reached', {
                current: this.requests.length,
                max: this.maxRequests
            });
            return false;
        }

        this.requests.push(now);
        return true;
    }

    getRemainingTime(): number {
        if (this.requests.length === 0) return 0;
        return this.window - (Date.now() - this.requests[0]);
    }

    getMaxRequests(): number {
        return this.maxRequests;
    }

    private cleanup(now: number): void {
        const cutoff = now - this.window;
        while (this.requests.length > 0 && this.requests[0] < cutoff) {
            this.requests.shift();
        }
    }
}
