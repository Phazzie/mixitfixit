import React from 'react';
import StatementInput from './src/components/StatementInput'; // Import StatementInput component
import StatementsDisplay from './src/components/StatementsDisplay'; // Import StatementsDisplay component
import SummarizeButton from './src/components/SummarizeButton'; // Import SummarizeButton component
import SummaryDisplay from './src/components/SummaryDisplay'; // Import SummaryDisplay component
import IssueProposal from './src/components/IssueProposal'; // Import IssueProposal component
import ErrorDisplay from './src/components/ErrorDisplay'; // Import ErrorDisplay component
import { SummaryProvider } from './contexts/SummaryContext';
import { useAppState } from './hooks/useAppState';

function App() {
  const { currentUser, isIssueAgreed, isSteelManningDone, isDiscussionDone, error } = useAppState();

  return (
    <div className="App">
      {/* Title */}
      <h1>Relationship Resolver</h1>

      {/* Display any error */}
      <ErrorDisplay error={error} />

      <SummaryProvider>
        {!isIssueAgreed && (
          <IssueProposal 
            currentUser={currentUser} 
            onIssueAgreed={handleIssueAgreement} 
          />
        )}

        {isIssueAgreed && !isSteelManningDone && (
          <SteelManning 
            currentUser={currentUser}
            onSteelManningDone={handleSteelManningDone}
          />
        )}

        {isSteelManningDone && !isDiscussionDone && (
          <Discussion 
            currentUser={currentUser}
            onDiscussionDone={handleDiscussionDone}
          />
        )}

        {isDiscussionDone && (
          <Summary />
        )}
      </SummaryProvider>
    </div>
  );
}

export default App;
