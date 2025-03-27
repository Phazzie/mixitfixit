export interface IAnalyzer {
  analyze(content: string): Promise<Result<Analysis>>;
}

export interface IValidator {
  validate(data: unknown): Result<ValidatedData>;
}

export interface IPromptBuilder {
  build(params: PromptParams): string;
}