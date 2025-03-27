class StatementPairValidator {
  validate(statement1: string, statement2: string): Result<void> {
    if (!statement1 || !statement2) {
      return failure(new ValidationError('Both statements are required'));
    }
    return success(void 0);
  }
}

class AnalysisResultFormatter {
  format(response: string): string {
    return response.trim();
  }
}

class AnalysisBuilder {
  constructor(
    private readonly idGenerator: StatementIdGenerator,
    private readonly timestampGenerator: StatementTimestampGenerator
  ) {}

  build(result: string): Analysis {
    return {
      id: this.idGenerator.generate(),
      result,
      createdAt: this.timestampGenerator.generate()
    };
  }
}

class AnalysisPersister {
  constructor(private readonly dataSource: IDataSource) {}

  async persist(analysis: Analysis): Promise<Result<Analysis>> {
    try {
      await this.dataSource.query(
        'INSERT INTO analyses (id, result, created_at) VALUES (?, ?, ?)',
        [analysis.id, analysis.result, analysis.createdAt]
      );
      return success(analysis);
    } catch (error) {
      return failure(new RepositoryError('Failed to persist analysis'));
    }
  }
}
