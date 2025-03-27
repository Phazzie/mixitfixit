import { useCallback, useState } from 'react';
import { usePhaseManager } from '../../../phase/hooks/usePhaseManager';
import { Phase } from '../../../phase/implementations/PhaseManager';
import { SteelManningData } from '../SteelManning';

export function useSteelManning(onComplete: (data: SteelManningData) => void) {
  const [restatement, setRestatement] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getPhaseData } = usePhaseManager();

  const originalStatement = getPhaseData(Phase.ISSUE_PROPOSAL)?.statement;

  const handleSubmitRestatement = useCallback(async () => {
    try {
      if (!restatement.trim()) {
        throw new Error('Restatement cannot be empty');
      }

      // Here you would typically validate the restatement
      // against the original statement using your validation logic
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit restatement');
    }
  }, [restatement]);

  const handleConfirmation = useCallback(async (confirmed: boolean) => {
    try {
      if (confirmed && !restatement) {
        throw new Error('Cannot confirm empty restatement');
      }

      setIsConfirmed(confirmed);

      if (confirmed) {
        onComplete({
          originalStatement,
          restatement,
          isConfirmed: true,
          authorId: 'original-author-id', // Get from context
          restaterId: 'restater-id' // Get from context
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm restatement');
    }
  }, [restatement, originalStatement, onComplete]);

  return {
    restatement,
    setRestatement,
    handleSubmitRestatement,
    handleConfirmation,
    isConfirmed,
    error
  };
}
