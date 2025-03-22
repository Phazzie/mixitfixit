// Import the React library.
import React, { useContext } from 'react';
// Import the ErrorContext to use the error.
import { ErrorContext } from '../contexts/ErrorContext';

/**
 * ErrorDisplay component.
 * This component is responsible for displaying error messages.
 */
const ErrorDisplay = () => {
  // Use the ErrorContext to access the error.
  const { error } = useContext(ErrorContext);

  return (
    // Check if there is an error before rendering.
    <>
      {error && (
        // Display the error message.
        <div className="error-display">
          <p>Error: {error}</p>
        </div>
      )}
    </>
  );
};

// Export the ErrorDisplay component for use in other parts of the application.
export default ErrorDisplay;