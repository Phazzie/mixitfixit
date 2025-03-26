import React from 'react';
import Summary from './components/Summary';
import { SummaryProvider } from './contexts/SummaryContext';

const App = () => {
  const { currentUser, isIssueAgreed, isSteelManningDone, isDiscussionDone } = useAppState();

  return (
    <main className="App" role="main">
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
    </main>
  );
};

export default App;

