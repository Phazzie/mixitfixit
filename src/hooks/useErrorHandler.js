import { useState } from 'react';

/**
 * @module useErrorHandler
 * @description This hook provides a centralized way to manage errors within the application.
 * It uses the useState hook to maintain the current error state.
 * The `setError` function allows components to set an error message, and passing `null` clears the error.
 * @returns {object} An object containing:
 *  - `setError`: A function to set or clear the current error message.
 *  - `error`: The current error message (string or null).
 */
const useErrorHandler = () => {
  /**
   * @constant {string|null} error - The current error message.
   * @description Uses the useState hook to manage the error state. The default value is `null` which means there are no errors.
   */
  const [error, setError] = useState(null);

  /**
   * @function setError
   * @description Sets the current error message, or clears it if `null` is passed.
   * @param {string|null} errorMessage - The error message to set. Pass `null` to clear the error.
   */
  const setErrorMessage = (errorMessage) => {
    /**
     * @description This logs the 'setError' message to the console.
     * @debug Useful for debugging purposes.
     */
    console.log('setError');
    setError(errorMessage);
  };

  return {
    setError: setErrorMessage,
    error,
  };
};

export default useErrorHandler;