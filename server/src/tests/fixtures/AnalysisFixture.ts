class AnalysisFixture {
  createAnalysis(): Analysis {
    return {
      id: this.generateId(),
      result: this.generateResult(),
      createdAt: new Date()
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  private generateResult(): string {
    return 'Test analysis result';
  }
}