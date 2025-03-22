import React from 'react';
import StatementInput from './src/components/StatementInput'; // Import StatementInput component
import StatementsDisplay from './src/components/StatementsDisplay'; // Import StatementsDisplay component
import SummarizeButton from './src/components/SummarizeButton'; // Import SummarizeButton component
import SummaryDisplay from './src/components/SummaryDisplay'; // Import SummaryDisplay component
import IssueProposal from './src/components/IssueProposal'; // Import IssueProposal component
import ErrorDisplay from './src/components/ErrorDisplay'; // Import ErrorDisplay component

function App() {
  // The App component is the root component of the application.
  // It imports and renders all the other components.

  // The App component will render the following components:
  // - ErrorDisplay: to display any error
  // - IssueProposal: to allow the user to propose an issue.
  // - StatementInput: to allow the user to add a statement.
  // - StatementsDisplay: to display the statements.
  // - SummarizeButton: to trigger the summarization.
  // - SummaryDisplay: to display the AI summary.
  return (
    <div className="App">
      {/* Title */}
      <h1>Relationship Resolver</h1>

      {/* Display any error */}
      <ErrorDisplay />

      {/* Component to add an issue proposal */}
      <IssueProposal />

      {/* Component to add a statement */}
      <StatementInput />

      {/* Component to display the statements */}
      <StatementsDisplay />

      {/* Button to summarize */}
      <SummarizeButton />

      {/* Component to display the AI summary */}
      <SummaryDisplay />
      <div>
      </div>
    </div>
  );
}

export default App;
