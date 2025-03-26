export const analysisTemplates: Record<string, PromptTemplate> = {
    statementAnalysis: {
        id: 'statementAnalysis',
        template: `
            Analyze the following statement for logical consistency and constructiveness:
            Statement: \${statement}
            
            Focus on:
            1. Key arguments
            2. Logical structure
            3. Constructive elements
            4. Potential improvements
            
            Provide analysis in JSON format.
        `,
        parameters: ['statement'],
        maxTokens: 1024,
        temperature: 0.7
    },
    
    steelManning: {
        id: 'steelManning',
        template: `
            Analyze if this restatement accurately represents the original position:
            Original: \${original}
            Restatement: \${restatement}
            
            Evaluate:
            1. Key points maintained
            2. Fairness to original
            3. Accuracy of interpretation
            
            Provide analysis in JSON format.
        `,
        parameters: ['original', 'restatement'],
        maxTokens: 1024,
        temperature: 0.7
    }
};