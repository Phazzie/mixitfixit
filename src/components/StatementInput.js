// StatementInput.js
import React, { useState } from 'react';
import { useStatementsManager } from '../hooks/useStatementsManager';

/**
 * StatementInput component for users to input and submit statements.
 * @returns {JSX.Element} The StatementInput component.
 */
const StatementInput = () => {
  // Get the addStatement function from the useStatementsManager hook
  const { addStatement } = useStatementsManager();
  // State to hold the current input text
  const [statementText, setStatementText] = useState('');

  /**
   * Handles changes in the text area.
   * @param {Event} event - The change event.
   */
  const handleInputChange = (event) => {
    setStatementText(event.target.value);
  };

  /**
   * Handles the submission of the statement.
   * @param {Event} event - The submit event.
   */
  const handleSubmit = (event) => {  
    event.preventDefault(); // Prevent default form submission behavior  
    // Check if the statementText is not empty  
    if (statementText.trim() !== '') {  
      // Add the statement to the state using the addStatement function from useStatementsManager  
      addStatement({ statement: statementText });  
      // Clear the input field after submission  
      setStatementText('');  
    } else {  
      console.log("Empty statement");  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Text area for user input */}
      <textarea
        value={statementText}
        onChange={handleInputChange}
        placeholder="Enter your statement here..."
      />
      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default StatementInput;