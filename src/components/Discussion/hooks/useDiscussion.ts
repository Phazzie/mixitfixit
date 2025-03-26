import { useCallback, useState } from 'react';
import { usePhaseManager } from '../../../phase/hooks/usePhaseManager';
import { Phase } from '../../../phase/types';
import { Statement, User } from '../../../shared/types';
import { useAIAnalysis } from './useAIAnalysis';
import { useStatementValidator } from './useStatementValidator';

const MAX_STATEMENTS_PER_USER = 3;

export function useDiscussion() {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { currentUser, completePhase } = usePhaseManager();
  const { validateStatement } = useStatementValidator();
  const { analyzeStatement } = useAIAnalysis();

  const getStatementsCount = (user: User) => 
    statements.filter(s => s.user === user).length;

  const canAddStatement = useCallback(() => {
    const userStatements = getStatementsCount(currentUser);
    return userStatements < MAX_STATEMENTS_PER_USER;
  }, [currentUser, statements]);

  const remainingStatements = MAX_STATEMENTS_PER_USER * 2 - statements.length;

  const addStatement = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate statement
      const validationResult = validateStatement(content);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // Analyze with AI
      const analysis = await analyzeStatement(content);
      if (!analysis.isConstructive) {
        throw new Error('Please ensure your statement is constructive and solution-focused');
      }

      const newStatement: Statement = {
        id: Date.now().toString(),
        content,
        user: currentUser,
        timestamp: new Date(),
        analysis: analysis
      };

      setStatements(prev => [...prev, newStatement]);

      // Check if discussion phase is complete
      if (statements.length + 1 === MAX_STATEMENTS_PER_USER * 2) {
        await completePhase(Phase.DISCUSSION, { statements: [...statements, newStatement] });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add statement');
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, statements, validateStatement, analyzeStatement, completePhase]);

  return {
    statements,
    currentUser,
    isLoading,
    error,
    addStatement,
    canAddStatement: canAddStatement(),
    remainingStatements
  };
}
