import { useStatements } from '../contexts/StatementsContext';

/**
 * @module useStatementsManager
 * @description This hook provides functions to manage a list of statements.
 * It utilizes the StatementsContext to access and modify the global state of statements.
 * @returns {object} An object containing functions to interact with the statements:
 *   - addStatement: Adds a new statement.
 *   - removeStatement: Removes a statement by index.
 */

const useStatementsManager = () => {
    // Access the current list of statements and the dispatch function from the StatementsContext.
    const { statements, dispatch } = useStatements();

    /**
     * @function addStatement
     * @description Adds a new statement to the list of statements.
     * It dispatches an 'ADD_STATEMENT' action to the reducer.
     * @param {string} text - The text content of the statement.
     * @throws {Error} If the statement text is empty.
     * @example
     * addStatement("This is a new statement.");
     */
    const addStatement = (text) => {
        // Check if the statement text is empty.
        if (!text) {
            throw new Error('Statement text cannot be empty.');
        }

        // Create a new statement object with a unique id.
        const newStatement = {
            id: Date.now(), // Simple way to generate a unique ID
            text: text,
        };

        // Dispatch an action to add the new statement to the global state.
        dispatch({
            type: 'ADD_STATEMENT',
            payload: newStatement,
        });
    };

    /**
    * @function removeStatement
    * @description Removes a statement from the list of statements.
    * @param {number} index - The index of the statement to remove.
    */
    const removeStatement = (index) => {
        // Dispatch an action to remove the statement from the global state.
        dispatch({
            type: 'REMOVE_STATEMENT',
            payload: index,
        });
    };

    return {
        getStatements,
        addStatement,
    };


};

export default useStatementsManager;