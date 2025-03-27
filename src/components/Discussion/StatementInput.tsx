import React from 'react';
import { User } from '../../shared/types';
import { TextArea } from '../shared/TextArea';
import { useStatementInput } from './hooks/useStatementInput';

interface StatementInputProps {
  onSubmit: (content: string) => Promise<void>;
  isLoading: boolean;
  currentUser: User;
}

export const StatementInput: React.FC<StatementInputProps> = ({
  onSubmit,
  isLoading,
  currentUser
}) => {
  const {
    content,
    handleChange,
    handleSubmit,
    characterCount
  } = useStatementInput(onSubmit, isLoading);

  return (
    <form onSubmit={handleSubmit} className="statement-input">
      <TextArea
        value={content}
        onChange={handleChange}
        placeholder="Share your perspective..."
        disabled={isLoading}
        maxLength={1000}
        rows={4}
      />
      
      <StatementInputFooter
        characterCount={characterCount}
        isSubmitDisabled={!content.trim() || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};
