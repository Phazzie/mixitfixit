class AnalysisServiceTests extends TestBase {
  private analysisService!: IAnalysisService;

  protected async setupTestData(): Promise<void> {
    this.analysisService = new AnalysisService(
      this.container.get('unitOfWork'),
      this.container.get('validator'),
      this.container.get('logger')
    );
  }

  @Test()
  async shouldAnalyzeStatements(): Promise<void> {
    // Arrange
    const statement1 = 'Test statement 1';
    const statement2 = 'Test statement 2';

    // Act
    const result = await this.analysisService.analyze(statement1, statement2);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  }

  protected async cleanupTestData(): Promise<void> {
    await this.container.get<IDataSource>('dataSource').clear();
  }
}