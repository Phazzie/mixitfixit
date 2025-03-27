import React from 'react';
import { Statement, User } from '../../shared/types';
import { StatementCard } from './StatementCard';

interface StatementListProps {
  statements: Statement[];
  currentUser: User;
}

export const StatementList: React.FC<StatementListProps> = ({
  statements,
  currentUser
}) => {
  return (
    <div className="statement-list">
      {statements.map((statement) => (
        <StatementCard
          key={statement.id}
          statement={statement}
          isCurrentUser={statement.user === currentUser}
        />
      ))}
      
      {statements.length === 0 && (
        <div className="empty-state">
          Start the discussion by sharing your perspective
        </div>
      )}
    </div>
  );
};