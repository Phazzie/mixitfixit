class UnitOfWork implements IUnitOfWork {
  private readonly repositories: Map<string, IRepository<unknown>>;

  constructor(
    private readonly dataSource: IDataSource,
    private readonly logger: ILogger
  ) {
    this.repositories = new Map();
  }

  getRepository<T>(name: string): IRepository<T> {
    if (!this.repositories.has(name)) {
      this.repositories.set(
        name,
        this.createRepository<T>(name)
      );
    }
    return this.repositories.get(name) as IRepository<T>;
  }

  async beginTransaction(): Promise<Result<void>> {
    try {
      await this.dataSource.beginTransaction();
      return success(void 0);
    } catch (error) {
      this.logger.error('Failed to begin transaction', error);
      return failure(new TransactionError('Failed to begin transaction'));
    }
  }

  async commit(): Promise<Result<void>> {
    try {
      await this.dataSource.commit();
      return success(void 0);
    } catch (error) {
      this.logger.error('Failed to commit transaction', error);
      return failure(new TransactionError('Failed to commit transaction'));
    }
  }

  async rollback(): Promise<Result<void>> {
    try {
      await this.dataSource.rollback();
      return success(void 0);
    } catch (error) {
      this.logger.error('Failed to rollback transaction', error);
      return failure(new TransactionError('Failed to rollback transaction'));
    }
  }

  private createRepository<T>(name: string): IRepository<T> {
    switch (name) {
      case 'analysis':
        return new AnalysisRepository(this.dataSource, this.logger);
      default:
        throw new Error(`Unknown repository: ${name}`);
    }
  }
}