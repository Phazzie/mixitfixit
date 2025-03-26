class StatementRepositoryTests extends TestBase {
  private repository!: StatementRepository;

  protected async setupTestData(): Promise<void> {
    this.repository = new StatementRepository(
      this.container.get('dataSource'),
      this.container.get('logger')
    );
  }

  @Test()
  async shouldCreateStatement(): Promise<void> {
    // Arrange
    const statement = TestFixture.createStatement();

    // Act
    const result = await this.repository.create(statement);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
    expect(result.data.content).toBe(statement.content);
  }

  @Test()
  async shouldFindStatementsByUserId(): Promise<void> {
    // Arrange
    const userId = 'test-user';
    const statement = TestFixture.createStatement({ userId });
    await this.repository.create(statement);

    // Act
    const result = await this.repository.findByUserId(userId);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].userId).toBe(userId);
  }

  protected async cleanupTestData(): Promise<void> {
    await this.container.get<IDataSource>('dataSource').clear();
  }
}