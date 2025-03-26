import { PhaseLogger } from './PhaseLogger';

describe('PhaseLogger', () => {
  let instance: PhaseLogger;

  beforeEach(() => {
    instance = new PhaseLogger();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  // Add more tests here
});
