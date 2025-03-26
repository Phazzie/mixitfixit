class StatementFixture {
  createStatement(): Statement {
    return {
      id: this.generateId(),
      content: this.generateContent(),
      createdAt: new Date()
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  private generateContent(): string {
    return 'Test statement content';
  }
}