import React, { createContext, useContext, useReducer } from 'react';

/**
 * @fileoverview This file defines the StatementsContext, which manages the state of statements in the application.
 * It includes a reducer for handling state updates, a provider component to make the state available, and a custom hook for accessing the state.
 */

/** @constant {Array} initialState - The initial state for statements. */

const initialState = [];

// Create the StatementsContext.
const StatementsContext = createContext();

/**
 * Custom hook to access the StatementsContext.
 * @returns {object} The current context value.
 */
export const useStatements = () => {
  const context = useContext(StatementsContext);
  if (!context) {
    throw new Error('useStatements must be used within a StatementsProvider');
  }
  return context;
};

/**
 * @function statementsReducer
 * @description Reducer function to manage the statements state.
 * @param {Array} state - The current state of statements.
 * @param {object} action - The action object with a type and optional payload.
 * @param {string} action.type - The type of action to perform.
 * @param {any} action.payload - The data associated with the action.
 * @returns {Array} The new state of the statements array.
 */
const statementsReducer = (state, action) => {
  switch (action.type) {
    /**
     * @case ADD_STATEMENT
     * @description Adds a new statement to the state.
     * @param {object} action.payload - The statement to add.
     * @param {string} action.payload.statement - The content of the statement.
     * @returns {Array} The new state with the added statement.
     */
    case 'ADD_STATEMENT':
      return [
        ...state,
        {
          statement: action.payload.statement,
        },
      ];
    default:
      return state;
  }
};

/**
 * StatementsProvider component.
 * Provides the statements state and dispatch function to its children.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @returns {JSX.Element} The StatementsContext provider.
 */
export const StatementsProvider = ({ children }) => {
  // Use useReducer to manage the state and dispatch actions.
  const [statements, dispatch] = useReducer(statementsReducer, initialState);

  return (
    // Provide the statements and dispatch function through the context.
    <StatementsContext.Provider
      value={{
        statements,
        dispatch,
      }}
    >
      {children}
    </StatementsContext.Provider>
  );
};

