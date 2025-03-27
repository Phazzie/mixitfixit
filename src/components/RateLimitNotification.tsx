interface RateLimitNotificationProps {
    rateLimiter: IRateLimiter;
}

export const RateLimitNotification: React.FC<RateLimitNotificationProps> = ({ rateLimiter }) => {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (!rateLimiter.canProceed()) {
            const timer = setInterval(() => {
                const timeLeft = rateLimiter.getRemainingTime();
                setRemainingTime(timeLeft);
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [rateLimiter]);

    if (rateLimiter.canProceed()) return null;

    return (
        <div className="rate-limit-notification">
            <h4>Rate Limit Reached</h4>
            <p>You've reached the maximum of {rateLimiter.getMaxRequests()} requests.</p>
            <p>Please wait {Math.ceil(remainingTime / 1000)} seconds before trying again.</p>
        </div>
    );
}
