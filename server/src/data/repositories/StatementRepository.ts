class StatementRepository implements IRepository<Statement> {
  constructor(
    private readonly dataSource: IDataSource,
    private readonly logger: ILogger
  ) {}

  async findByUserId(userId: string): Promise<Result<Statement[]>> {
    try {
      const result = await this.dataSource.query(
        'SELECT * FROM statements WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return success(result.map(this.mapToEntity));
    } catch (error) {
      this.logger.error('Failed to find statements by user', error);
      return failure(new RepositoryError('Failed to find statements'));
    }
  }

  async create(statement: Statement): Promise<Result<Statement>> {
    try {
      const result = await this.dataSource.query(
        'INSERT INTO statements (user_id, content, created_at) VALUES (?, ?, ?)',
        [statement.userId, statement.content, new Date()]
      );
      return success({ ...statement, id: result.insertId });
    } catch (error) {
      this.logger.error('Failed to create statement', error);
      return failure(new RepositoryError('Failed to create statement'));
    }
  }

  private mapToEntity(data: unknown): Statement {
    // Implementation of mapping logic
    return data as Statement;
  }
}