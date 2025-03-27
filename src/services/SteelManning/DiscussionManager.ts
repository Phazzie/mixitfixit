interface DiscussionState {
  currentPhase: 'INITIAL_STATEMENTS' | 'UNDERSTANDING' | 'DISCUSSION';
  statements: RawStatement[];
  restatements: Restatement[];
}

class DiscussionManager {
  constructor(
    private readonly analyzer: StatementAnalyzer,
    private readonly store: IStateStore
  ) {}

  async handleRestatement(
    originalStatementId: string, 
    restatement: string,
    userId: string
  ): Promise<Result<void>> {
    const original = await this.store.getStatement(originalStatementId);
    
    if (original.userId === userId) {
      return failure(new Error("Can't restate your own statement"));
    }

    const analysis = await this.analyzer.analyzeRestatement({
      originalStatement: original,
      restatement,
      userId
    });

    if (!analysis.understood) {
      return failure({
        type: 'MISUNDERSTANDING',
        missedPoints: analysis.missedPoints
      });
    }

    await this.store.saveRestatement({
      originalStatementId,
      restatement,
      userId,
      timestamp: new Date()
    });

    return success(void 0);
  }
}