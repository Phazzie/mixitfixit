import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create a root for the React application to render into.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component into the root.
// The App component is the main entry point for the entire application.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);