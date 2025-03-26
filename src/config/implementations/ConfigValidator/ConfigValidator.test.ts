import { ConfigValidator } from './ConfigValidator';

describe('ConfigValidator', () => {
  let instance: ConfigValidator;

  beforeEach(() => {
    instance = new ConfigValidator();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  // Add more tests here
});
