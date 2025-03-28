import { RateLimiter } from './RateLimiter';
import { MockLogger } from '../../test/mocks/MockLogger';

describe('RateLimiter', () => {
    let rateLimiter: RateLimiter;
    let mockLogger: MockLogger;

    beforeEach(() => {
        jest.useFakeTimers();
        mockLogger = new MockLogger();
        rateLimiter = new RateLimiter(60, mockLogger);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should allow requests when under limit', () => {
        expect(rateLimiter.canProceed()).toBe(true);
    });

    it('should block requests when limit reached', () => {
        // Make 60 requests
        for (let i = 0; i < 60; i++) {
            rateLimiter.canProceed();
        }
        expect(rateLimiter.canProceed()).toBe(false);
    });

    it('should reset after window period', () => {
        // Fill up the limit
        for (let i = 0; i < 60; i++) {
            rateLimiter.canProceed();
        }
        
        // Advance time by 1 minute
        jest.advanceTimersByTime(60000);
        
        expect(rateLimiter.canProceed()).toBe(true);
    });

    it('should return correct remaining time', () => {
        rateLimiter.canProceed(); // Make one request
        expect(rateLimiter.getRemainingTime()).toBeLessThanOrEqual(60000);
        expect(rateLimiter.getRemainingTime()).toBeGreaterThan(0);
    });

    it('should return correct max requests', () => {
        expect(rateLimiter.getMaxRequests()).toBe(60);
    });
});