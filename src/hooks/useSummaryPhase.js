import { useState, useCallback } from 'react';
import { useSummary } from '../contexts/SummaryContext';
import { useStatements } from '../contexts/StatementsContext';

/**
 * Hook for managing the summary phase logic
 */
export const useSummaryPhase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateSummaryData } = useSummary();
  const { statements } = useStatements();

  /**
   * Generates key points from the discussion
   * @param {Array} statements - Discussion statements
   * @returns {Array} Extracted key points
   */
  const extractKeyPoints = useCallback((statements) => {
    return statements
      .filter(statement => statement.isKeyPoint)
      .map(statement => statement.content);
  }, []);

  /**
   * Generates the final summary
   * @param {string} issue - The discussed issue
   * @param {string} resolution - The agreed resolution
   */
  const generateSummary = useCallback(async (issue, resolution) => {
    setIsLoading(true);
    setError(null);

    try {
      const keyPoints = extractKeyPoints(statements);
      
      updateSummaryData({
        issue,
        statements: statements.map(s => ({
          userId: s.userId,
          content: s.content
        })),
        keyPoints,
        resolution
      });
    } catch (err) {
      setError('Failed to generate summary');
      console.error('Summary generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [statements, updateSummaryData, extractKeyPoints]);

  return {
    isLoading,
    error,
    generateSummary
  };
};
