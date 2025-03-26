import React from 'react';
import { useDiscussion } from './hooks/useDiscussion';
import { StatementInput } from './StatementInput';
import { StatementList } from './StatementList';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export const Discussion: React.FC = () => {
  const {
    statements,
    currentUser,
    isLoading,
    error,
    addStatement,
    canAddStatement,
    remainingStatements
  } = useDiscussion();

  return (
    <div className="discussion-container">
      <ProgressIndicator 
        current={statements.length} 
        total={remainingStatements} 
      />
      
      <StatementList 
        statements={statements}
        currentUser={currentUser}
      />
      
      {canAddStatement && (
        <StatementInput 
          onSubmit={addStatement}
          isLoading={isLoading}
          currentUser={currentUser}
        />
      )}
      
      <ErrorDisplay error={error} />
    </div>
  );
};