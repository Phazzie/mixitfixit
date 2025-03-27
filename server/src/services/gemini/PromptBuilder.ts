class PromptBuilder implements IPromptBuilder {
  constructor(private readonly config: PromptConfig) {}

  build(params: PromptParams): string {
    return [
      this.config.prefix,
      this.formatStatements(params),
      this.config.instructions,
      this.config.suffix
    ].join(' ');
  }

  private formatStatements(params: PromptParams): string {
    return `Statement 1: ${params.statement1}, Statement 2: ${params.statement2}`;
  }
}

