// SummaryDisplay.js
import React from 'react'; // Import React
import { useSummarizeStatements } from '../hooks/useSummarizeStatements'; // Import the useSummarizeStatements hook

/**
 * SummaryDisplay component: Displays the AI-generated summary of the statements.
 */
function SummaryDisplay() {
  // Use the useSummarizeStatements hook to get the aiResponse
  const { aiResponse } = useSummarizeStatements();

  return (
    <div>
      {/* If there is an aiResponse, display it. If not, display a placeholder. */}
      {aiResponse ? (
        <p>AI Summary: {aiResponse}</p>
      ) : (
        <p>AI Summary: [placeholder]</p>
      )}

    </div>
  );
}

export default SummaryDisplay;