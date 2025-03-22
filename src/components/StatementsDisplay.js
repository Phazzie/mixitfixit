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

const StatementsDisplay = () => { // Add the function
  const { getStatements, addStatement } = useStatementsManager();
  const { error} = useErrorHandler();

  const statements = getStatements();

    /**
     * @function handleNewStatementClick
     * @description Handles the click event to add a new statement.
     */
    const handleNewStatementClick = () => {
        const randomStatement = Math.random().toString(36).substring(7);
        addStatement({ statement: randomStatement });
    };

    const { handleSummarizeClick, aiResponse } = useSummarizeStatements();

  return (
    <div>      
      {error && <div>Error: {error}</div>}
      <button onClick={handleNewStatementClick}>Add New Statement</button>
      <button onClick={handleSummarizeClick}>Summarize with AI</button>
       {aiResponse && (
          <div>
            <h3>AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
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