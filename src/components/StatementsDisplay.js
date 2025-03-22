import React from "react";
import { useStatementsManager } from "../hooks/useStatementsManager";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useSummarizeStatements } from "../hooks/useSummarizeStatements";

/**
 * @function StatementsDisplay
 * @description Functional component that displays a list of statements.
 * @param {object} props - The component props.
 * @returns {JSX.Element} The StatementsDisplay component.
 */

const StatementsDisplay = () => {
  // Get the getStatements function and the statements array from the useStatementsManager hook
  const { getStatements } = useStatementsManager();
  // Get the error from the useErrorHandler hook
  const { error } = useErrorHandler();

  // Get the statements from the getStatements function
  const statements = getStatements();

  /**
     * @function handleNewStatementClick 
     * @description This function generates a random string and add it as a new statement
     * @function handleNewStatementClick 
     * @description Handles the click event to add a new statement.
     */
    const handleNewStatementClick = () => {
        const randomStatement = Math.random().toString(36).substring(7);
        addStatement({ statement: randomStatement });
    };

  // Get the handleSummarizeClick function and the aiResponse from the useSummarizeStatements hook
  const { handleSummarizeClick, aiResponse } = useSummarizeStatements();

  return (
    <div>
      {/* If there is any error, show it */}
      {error && <div>Error: {error}</div>}

      {/* Button to add a new statement */}

      <button onClick={handleNewStatementClick}>Add New Statement</button>
      <button onClick={handleSummarizeClick}>Summarize with AI</button>
       {aiResponse && (
          <div>
            <h3>AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}

        {/* If there are any statements, show them */}
      {statements && (
        <>
          <h2>Statements</h2>
          <ul>
            {statements.map((statement, index) => (
              <li key={index}>{statement.statement}</li>
            ))}
          </ul>
        </>
        
      )}
    </div>
  );
};

export default StatementsDisplay;