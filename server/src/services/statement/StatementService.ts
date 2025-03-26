// Break down statement handling into atomic operations
class StatementIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}

class StatementTimestampGenerator {
  generate(): Date {
    return new Date();
  }
}

class StatementValidator {
  validate(content: string): Result<string> {
    if (!content?.trim()) {
      return failure(new ValidationError('Statement cannot be empty'));
    }
    return success(content);
  }
}

class StatementSanitizer {
  sanitize(content: string): string {
    return content.trim();
  }
}

class StatementBuilder {
  constructor(
    private readonly idGenerator: StatementIdGenerator,
    private readonly timestampGenerator: StatementTimestampGenerator,
    private readonly sanitizer: StatementSanitizer
  ) {}

  build(content: string, userId: string): Statement {
    return {
      id: this.idGenerator.generate(),
      content: this.sanitizer.sanitize(content),
      userId,
      createdAt: this.timestampGenerator.generate()
    };
  }
}

class StatementPersister {
  constructor(private readonly dataSource: IDataSource) {}

  async persist(statement: Statement): Promise<Result<Statement>> {
    try {
      const result = await this.dataSource.query(
        'INSERT INTO statements (id, user_id, content, created_at) VALUES (?, ?, ?, ?)',
        [statement.id, statement.userId, statement.content, statement.createdAt]
      );
      return success(statement);
    } catch (error) {
      return failure(new RepositoryError('Failed to persist statement'));
    }
  }
}
