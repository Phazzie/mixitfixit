import React, { useEffect } from 'react';
import StatementsDisplay from './src/components/StatementsDisplay';
import { useStatements } from './src/contexts/StatementsContext';
import { useStatementsManager } from './src/hooks/useStatementsManager';
import { useSummarizeStatements } from './src/hooks/useSummarizeStatements';
import { useErrorHandler } from './src/hooks/useErrorHandler';

function App() {
  const { statements } = useStatements();
  const { getStatements, addStatement } = useStatementsManager();
  const { handleSummarizeClick, aiResponse } = useSummarizeStatements();
  const { error, setError } = useErrorHandler();

  useEffect(() => {
    getStatements();
  }, [getStatements]);

  const handleNewStatementClick = () => {
    // Generate a random statement for testing
    const randomStatement = `Statement ${Math.floor(Math.random() * 1000)}`;
    addStatement({ statement: randomStatement });
  };

  const handleButtonClick = () => {
    try {
      handleSummarizeClick();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Relationship Resolver</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <StatementsDisplay statements={statements} />
      <div>
        <button onClick={handleNewStatementClick}>Add New Statement</button>
      </div>
      <div>
        <button onClick={handleButtonClick}>Summarize with AI</button>
        {aiResponse && <div>AI Response: {aiResponse}</div>}
      </div>
    </div>
  );
}

export default App;
