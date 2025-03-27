describe('ModelSelector', () => {
  const selector = new ModelSelector();
  const mockClient = {
    getGenerativeModel: jest.fn()
  };

  it('selects model with correct configuration', () => {
    selector.select(mockClient as any);
    expect(mockClient.getGenerativeModel).toHaveBeenCalledWith({
      model: "gemini-pro",
      safetySettings: DEFAULT_MODEL_CONFIG.safetySettings,
      generationConfig: DEFAULT_MODEL_CONFIG.generationConfig
    });
  });
});