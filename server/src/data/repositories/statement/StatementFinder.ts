class StatementFinder {
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
      return success(this.mapToEntities(result));
    } catch (error) {
      this.logger.error('Failed to find statements by user', error);
      return failure(new RepositoryError('Failed to find statements'));
    }
  }
}