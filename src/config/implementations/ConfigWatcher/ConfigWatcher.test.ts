import { ConfigWatcher } from './ConfigWatcher';

describe('ConfigWatcher', () => {
  let instance: ConfigWatcher;

  beforeEach(() => {
    instance = new ConfigWatcher();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  // Add more tests here
});
