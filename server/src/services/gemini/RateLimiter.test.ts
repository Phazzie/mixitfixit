1describe('RateLimiter', () => {
  let limiter: RateLimiter;
  
  beforeEach(() => {
    limiter = new RateLimiter();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('allows requests within limit', () => {
    for (let i = 0; i < 60; i++) {
      expect(limiter.canMakeRequest()).toBe(true);
    }
  });

  it('blocks requests over limit', () => {
    for (let i = 0; i < 60; i++) {
      limiter.canMakeRequest();
    }
    expect(limiter.canMakeRequest()).toBe(false);
  });

  it('resets after window period', () => {
    for (let i = 0; i < 60; i++) {
      limiter.canMakeRequest();
    }
    jest.advanceTimersByTime(60000);
    expect(limiter.canMakeRequest()).toBe(true);
  });
});