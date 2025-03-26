import React from 'react';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { useNavigation } from './navigation/useNavigation';
import { usePhaseManager } from './phase/hooks/usePhaseManager';
import { IssueProposal } from './components/IssueProposal';
import { SteelManning } from './components/SteelManning';
import { Discussion } from './components/Discussion';
import { Summary } from './components/Summary';

const App: React.FC = () => {
  const { currentPhase, completePhase } = usePhaseManager();
  const { navigate } = useNavigation();

  return (
    <ErrorBoundary>
      <main className="App" role="main">
        {currentPhase === Phase.ISSUE_PROPOSAL && (
          <IssueProposal 
            onComplete={(data) => completePhase(Phase.ISSUE_PROPOSAL, data)} 
          />
        )}

        {currentPhase === Phase.STEEL_MANNING && (
          <SteelManning 
            onComplete={(data) => completePhase(Phase.STEEL_MANNING, data)} 
          />
        )}

        {currentPhase === Phase.DISCUSSION && (
          <Discussion 
            onComplete={(data) => completePhase(Phase.DISCUSSION, data)} 
          />
        )}

        {currentPhase === Phase.SUMMARY && (
          <Summary />
        )}
      </main>
    </ErrorBoundary>
  );
};

export default App;