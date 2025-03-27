export class RateLimiter {
  private readonly requestWindow = 60000; // 1 minute in milliseconds
  private readonly maxRequests = 60;
  private requests: number[] = [];

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.requestWindow);
    if (this.requests.length >= this.maxRequests) return false;
    this.requests.push(now);
    return true;
  }
}