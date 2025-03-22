import React from 'react';
import { StatementsProvider } from './src/contexts/StatementsContext';

function App() {
  return (
    <StatementsProvider>
      <div className="App">
        {/* Your application components go here */}
      </div>
    </StatementsProvider>
  );
}

export default App;