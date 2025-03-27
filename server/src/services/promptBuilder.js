class PromptBuilder {
  buildAnalysisPrompt(statement1, statement2) {
    return this.formatPrompt([
      this.getPromptHeader(),
      this.formatStatement(1, statement1),
      this.formatStatement(2, statement2),
      this.getPromptFooter()
    ]);
  }

  private formatPrompt(parts) {
    return parts.join('\n');
  }

  private getPromptHeader() {
    return 'Analyze these two statements for logical fallacies:';
  }

  private formatStatement(number, statement) {
    return `Statement ${number}: ${statement}`;
  }

  private getPromptFooter() {
    return 'If there are any logical fallacies, describe them and explain why they are fallacies.';
  }
}

module.exports = PromptBuilder;
