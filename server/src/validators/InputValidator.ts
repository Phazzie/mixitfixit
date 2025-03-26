// Single Responsibility: Input validation only
export class InputValidator {
  validate(input: AnalysisInput): Result<void> {
    if (!input.apiKey?.trim()) {
      return failure(new ValidationError('API key required'));
    }

    if (!input.statements?.length === 2) {
      return failure(new ValidationError('Exactly two statements required'));
    }

    if (!input.statements.every(s => s?.trim())) {
      return failure(new ValidationError('Statements cannot be empty'));
    }

    return success(void 0);
  }
}