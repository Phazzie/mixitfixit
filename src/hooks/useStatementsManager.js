import { useStatements } from '../contexts/StatementsContext';

/**
 * @module useStatementsManager
 * @description Provides functions to manage statements.
 * @returns {object} - An object containing the functions: getStatements, addStatement.
 */

const useStatementsManager = () => {
    // Use the useStatements hook to access statements and dispatch
    const { statements, dispatch } = useStatements();

    /**
     * @function getStatements
     * @description Retrieves the current list of statements.
     * @returns {Array<object>} An array of statement objects.
     */
    const getStatements = () => statements;

    /**
     * @function addStatement
     * @description Adds a new statement to the list of statements.
     * @param {object} statement - The statement object to add.
     * @param {string} statement.text - The text content of the statement.
     * @param {string} statement.author - The author of the statement.
     * @example
     * addStatement({ text: 'This is a statement.', author: 'John Doe' });
     */
    const addStatement = (statement) => {
        // Dispatch an action to add the new statement
        dispatch({
            type: 'ADD_STATEMENT',
            payload: statement,
        });
    };

    return {
        getStatements,
        addStatement,
    };
};

export default useStatementsManager;