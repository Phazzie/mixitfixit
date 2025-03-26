import React from 'react';
import { useSteelManning } from './hooks/useSteelManning';
import { RestatementInput } from './RestatementInput';
import { RestatementDisplay } from './RestatementDisplay';
import { ConfirmationControls } from './ConfirmationControls';

interface SteelManningProps {
  onComplete: (data: SteelManningData) => void;
}

export interface SteelManningData {
  originalStatement: string;
  restatement: string;
  isConfirmed: boolean;
  authorId: string;
  restaterId: string;
}

export const SteelManning: React.FC<SteelManningProps> = ({ onComplete }) => {
  const {
    restatement,
    setRestatement,
    handleSubmitRestatement,
    handleConfirmation,
    isConfirmed,
    error
  } = useSteelManning(onComplete);

  return (
    <div className="steel-manning-phase">
      <h2>Steel Manning Phase</h2>
      {error && <div className="error-message">{error}</div>}
      
      <RestatementInput
        value={restatement}
        onChange={setRestatement}
        onSubmit={handleSubmitRestatement}
        disabled={isConfirmed}
      />

      <RestatementDisplay />
      
      <ConfirmationControls
        onConfirm={() => handleConfirmation(true)}
        onReject={() => handleConfirmation(false)}
        disabled={!restatement || isConfirmed}
      />
    </div>
  );
};