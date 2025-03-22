// SummarizeButton.js

import React from 'react';
import { useSummarizeStatements } from '../hooks/useSummarizeStatements';

/**
 * SummarizeButton component.
 * This component renders a button labeled "Summarize" and connects it to the handleSummarizeClick function.
 */
function SummarizeButton() {
  // Use the useSummarizeStatements hook to get the handleSummarizeClick function.
  const { handleSummarizeClick } = useSummarizeStatements();

  /**
   * handleClick.
   * This function is called when the Summarize button is clicked.
   * It triggers the handleSummarizeClick function to initiate the summarization process.
   * @returns {void}
   */
  const handleClick = () => {
    // Call the handleSummarizeClick function to initiate the summarization process.
    handleSummarizeClick();
  };

  /**
   * Renders a button that, when clicked, calls the handleClick function.
   */
  return (
    // Button that, when clicked, calls the handleClick function.
    <button onClick={handleClick}>Summarize</button>
  );
}

export default SummarizeButton;