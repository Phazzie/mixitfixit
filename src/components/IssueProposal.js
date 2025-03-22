// IssueProposal.js
import React, { useState } from 'react';

/**
 * @module IssueProposal
 * @description This component provides a text area for the user to propose an issue and a button to submit the proposal. It uses a state to save the issue.
 * @returns {JSX.Element} The IssueProposal component.
 */
const IssueProposal = () => {
  // Create a state to manage the input text
  const [issue, setIssue] = useState('');

  /**
   * @function handleIssueChange
   * @description This function is called when the text in the text area changes. It updates the state with the new value.
   * @param {object} event - The event object.
   */
  const handleIssueChange = (event) => {
    setIssue(event.target.value);
  };

  /**
   * @function handleIssueSubmit
   * @description This function is called when the user clicks the submit button. It logs the issue to the console.
   */
  const handleIssueSubmit = () => {
    console.log('Issue submitted:', issue);
    // Clear the input after submitting
    setIssue('');
  };

  return (
    <div>
      {/* Text area for the user to input their issue proposal */}
      <textarea
        placeholder="Propose an issue here..."
        rows={4} // Set the number of rows to make the text area larger
        value={issue} // Set the value of the input to the state
        onChange={handleIssueChange} // Set the on change function
      />
      {/* Button to submit the issue proposal */}
      <button onClick={handleIssueSubmit}>Submit Issue</button>
    </div>
  );
};

export default IssueProposal;