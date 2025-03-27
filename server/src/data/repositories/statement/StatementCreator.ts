class StatementCreator {
  constructor(
    private readonly dataSource: IDataSource,
    private readonly logger: ILogger
  ) {}

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
}