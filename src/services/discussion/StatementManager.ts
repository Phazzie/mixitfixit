import { Statement, User } from '../../shared/types';
import { IStatementValidator } from '../validation/StatementValidator';
import { IAIAnalyzer } from '../ai/AIAnalyzer';

export interface IStatementManager {
  addStatement(content: string, user: User): Promise<Statement>;
  canAddStatement(user: User, statements: Statement[]): boolean;
  getRemainingStatements(totalStatements: number): number;
}

export class StatementManager implements IStatementManager {
  private readonly MAX_STATEMENTS_PER_USER = 3;
  private readonly TOTAL_MAX_STATEMENTS = this.MAX_STATEMENTS_PER_USER * 2;

  constructor(
    private readonly validator: IStatementValidator,
    private readonly aiAnalyzer: IAIAnalyzer
  ) {}

  async addStatement(content: string, user: User): Promise<Statement> {
    const validationResult = this.validator.validate(content);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    const analysis = await this.aiAnalyzer.analyze(content);
    if (!analysis.isConstructive) {
      throw new Error('Please ensure your statement is constructive and solution-focused');
    }

    return {
      id: Date.now().toString(),
      content,
      user,
      timestamp: new Date(),
      analysis
    };
  }

  canAddStatement(user: User, statements: Statement[]): boolean {
    const userStatements = statements.filter(s => s.user === user).length;
    return userStatements < this.MAX_STATEMENTS_PER_USER;
  }

  getRemainingStatements(totalStatements: number): number {
    return this.TOTAL_MAX_STATEMENTS - totalStatements;
  }
}