import { useState } from 'react';

/**
 * @module useErrorHandler
 * @description Provides functions to manage errors.
 * @returns {object} - An object containing the functions: setError and error.
 */
const useErrorHandler = () => {
  /**
   * @constant {string|null} error - The current error message.
   * @description Uses the useState hook to manage the error state.
   */
  const [error, setError] = useState(null);

  /**
   * @function setError
   * @description Sets the error message.
   * @param {string|null} errorMessage - The error message to set.
   */
  const setErrorMessage = (errorMessage) => {
    console.log('setError');
    setError(errorMessage);
  };

  return {
    setError: setErrorMessage,
    error,
  };
};

export default useErrorHandler;