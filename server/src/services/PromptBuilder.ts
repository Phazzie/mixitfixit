class PromptBuilder {
  private readonly templates = {
    header: 'Analyze these two statements for logical fallacies:',
    statement: (num: number, text: string) => `Statement ${num}: ${text}`,
    footer: 'If there are any logical fallacies, describe them and explain why they are fallacies.'
  };

  build(statement1: string, statement2: string): string {
    return [
      this.templates.header,
      this.templates.statement(1, statement1),
      this.templates.statement(2, statement2),
      this.templates.footer
    ].join('\n');
  }
}