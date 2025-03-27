export class RateLimiter implements IRateLimiter {
    private readonly window: number = 60000; // 1 minute
    private readonly requests: number[] = [];

    constructor(private readonly maxRequests: number) {}

    canProceed(): boolean {
        const now = Date.now();
        this.cleanup(now);
        
        if (this.requests.length >= this.maxRequests) {
            return false;
        }

        this.requests.push(now);
        return true;
    }

    private cleanup(now: number): void {
        const cutoff = now - this.window;
        while (this.requests.length > 0 && this.requests[0] < cutoff) {
            this.requests.shift();
        }
    }
}