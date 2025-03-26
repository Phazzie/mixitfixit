import React from 'react';

interface ConfirmationControlsProps {
  onConfirm: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export const ConfirmationControls: React.FC<ConfirmationControlsProps> = ({
  onConfirm,
  onReject,
  disabled
}) => {
  return (
    <div className="confirmation-controls">
      <button
        onClick={onConfirm}
        disabled={disabled}
        className="confirm-button"
      >
        Confirm Understanding
      </button>
      <button
        onClick={onReject}
        disabled={disabled}
        className="reject-button"
      >
        Needs Revision
      </button>
    </div>
  );
};