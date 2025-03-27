class TestFixture {
  static createAnalysis(): Analysis {
    return {
      id: crypto.randomUUID(),
      statement1: 'Test statement 1',
      statement2: 'Test statement 2',
      result: 'Test analysis result',
      createdAt: new Date()
    };
  }

  static createValidationContext(): ValidationContext {
    return {
      maxLength: 1000,
      minLength: 10,
      allowedCharacters: /^[a-zA-Z0-9\s.,!?'"()-]+$/
    };
  }
}