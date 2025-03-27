import { render, screen } from '@testing-library/react';
import { RateLimitNotification } from './RateLimitNotification';

describe('RateLimitNotification', () => {
    const mockRateLimiter = {
        canProceed: jest.fn(),
        getRemainingTime: jest.fn(),
        getMaxRequests: jest.fn()
    };

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it('should not render when requests can proceed', () => {
        mockRateLimiter.canProceed.mockReturnValue(true);
        
        const { container } = render(
            <RateLimitNotification rateLimiter={mockRateLimiter} />
        );
        
        expect(container.firstChild).toBeNull();
    });

    it('should render notification when rate limited', () => {
        mockRateLimiter.canProceed.mockReturnValue(false);
        mockRateLimiter.getRemainingTime.mockReturnValue(30000);
        mockRateLimiter.getMaxRequests.mockReturnValue(60);

        render(<RateLimitNotification rateLimiter={mockRateLimiter} />);

        expect(screen.getByText(/Rate Limit Reached/i)).toBeInTheDocument();
        expect(screen.getByText(/30 seconds/i)).toBeInTheDocument();
        expect(screen.getByText(/maximum of 60 requests/i)).toBeInTheDocument();
    });

    it('should update countdown timer', () => {
        mockRateLimiter.canProceed.mockReturnValue(false);
        mockRateLimiter.getRemainingTime
            .mockReturnValueOnce(30000)
            .mockReturnValueOnce(29000);
        mockRateLimiter.getMaxRequests.mockReturnValue(60);

        render(<RateLimitNotification rateLimiter={mockRateLimiter} />);

        expect(screen.getByText(/30 seconds/i)).toBeInTheDocument();
        
        jest.advanceTimersByTime(1000);
        
        expect(screen.getByText(/29 seconds/i)).toBeInTheDocument();
    });
});