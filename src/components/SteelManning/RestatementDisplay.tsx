import React from 'react';
import { usePhaseManager } from '../../phase/hooks/usePhaseManager';
import { Phase } from '../../phase/implementations/PhaseManager';

export const RestatementDisplay: React.FC = () => {
  const { getPhaseData } = usePhaseManager();
  const originalStatement = getPhaseData(Phase.ISSUE_PROPOSAL)?.statement;

  return (
    <div className="restatement-display">
      <div className="original-statement">
        <h3>Original Statement</h3>
        <p>{originalStatement}</p>
      </div>
    </div>
  );
};