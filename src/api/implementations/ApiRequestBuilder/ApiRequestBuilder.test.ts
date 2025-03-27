import { ApiRequestBuilder } from './ApiRequestBuilder';

describe('ApiRequestBuilder', () => {
  let instance: ApiRequestBuilder;

  beforeEach(() => {
    instance = new ApiRequestBuilder();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  // Add more tests here
});
