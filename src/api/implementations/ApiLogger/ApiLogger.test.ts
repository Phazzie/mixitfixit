import { ApiLogger } from './ApiLogger';

describe('ApiLogger', () => {
  let instance: ApiLogger;

  beforeEach(() => {
    instance = new ApiLogger();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  // Add more tests here
});
