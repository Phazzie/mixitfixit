import React from 'react';

interface RestatementInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const RestatementInput: React.FC<RestatementInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled
}) => {
  return (
    <div className="restatement-input">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Restate the original statement in your own words..."
        rows={4}
      />
      <button 
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
      >
        Submit Restatement
      </button>
    </div>
  );
};
