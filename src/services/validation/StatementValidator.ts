export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface IStatementValidator {
  validate(content: string): ValidationResult;
}

export class StatementValidator implements IStatementValidator {
  private readonly MAX_LENGTH = 1000;
  private readonly MIN_LENGTH = 10;

  validate(content: string): ValidationResult {
    if (!content.trim()) {
      return { isValid: false, error: 'Statement cannot be empty' };
    }

    if (content.length > this.MAX_LENGTH) {
      return { isValid: false, error: `Statement must be less than ${this.MAX_LENGTH} characters` };
    }

    if (content.length < this.MIN_LENGTH) {
      return { isValid: false, error: `Statement must be at least ${this.MIN_LENGTH} characters` };
    }

    return { isValid: true };
  }
}