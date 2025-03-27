const { PromptBuilder } = require('../../utils/promptBuilder');

describe('PromptBuilder', () => {
  let promptBuilder;

  beforeEach(() => {
    promptBuilder = new PromptBuilder();
  });

  test('builds analysis prompt correctly', () => {
    const statement1 = 'All cats are black';
    const statement2 = 'My cat is white';
    
    const result = promptBuilder.buildAnalysisPrompt(statement1, statement2);
    
    expect(result).toContain('Statement 1: All cats are black');
    expect(result).toContain('Statement 2: My cat is white');
    expect(result).toContain('Analyze these two statements');
    expect(result).toContain('logical fallacies');
  });
});