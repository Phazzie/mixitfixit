import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StatementInput from './StatementInput';
import { StatementsContext } from '../contexts/StatementsContext';
import { useStatementsManager } from '../hooks/useStatementsManager';

// Mock the useStatementsManager hook
jest.mock('../hooks/useStatementsManager');

/**
 * Mock the context value
 */

/**
 * Describe the tests for the StatementInput component.
 */
describe('StatementInput Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure a clean state.
    jest.clearAllMocks();
  });

  // Test to check if the component renders without crashing.
  it('should render without crashing', () => {
    useStatementsManager.mockReturnValue({ addStatement: jest.fn() });

    // Act
        // Render the component within StatementsContext.Provider.
    render(
      <StatementsContext.Provider value={{ statements: [] }}>
        <StatementInput />
      </StatementsContext.Provider>
    );

    // Assert
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  // Test to check if a text area is rendered.
  it('should render a text area', () => {
        useStatementsManager.mockReturnValue({ addStatement: jest.fn() });

    // Act
        // Render the component within StatementsContext.Provider.
    render(
      <StatementsContext.Provider value={{ statements: [] }}>
        <StatementInput />
      </StatementsContext.Provider>
    );

    // Assert
    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
  });

  // Test to check if a "Submit" button is rendered.
  it('should render a "Submit" button', () => {
        useStatementsManager.mockReturnValue({ addStatement: jest.fn() });

    // Act
        // Render the component within StatementsContext.Provider.
    render(
      <StatementsContext.Provider value={{ statements: [] }}>
        <StatementInput />
      </StatementsContext.Provider>
    );

    // Assert
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  // Test to check if the addStatement function from useStatementsManager is called when the "Submit" button is clicked.
  it('should call addStatement from useStatementsManager when the "Submit" button is clicked', () => {
    // Arrange: Create a mock function for addStatement.
    const addStatementMock = jest.fn();
    useStatementsManager.mockReturnValue({ addStatement: addStatementMock });

    // Act
        // Render the component within StatementsContext.Provider.
    render(
      <StatementsContext.Provider value={{ statements: [] }}>
        <StatementInput />
      </StatementsContext.Provider>
    );
    // Get the submit button.
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Act
    fireEvent.change(textArea, { target: { value: 'Test statement' } });
    fireEvent.click(submitButton);

    // Assert
    expect(addStatementMock).toHaveBeenCalledTimes(1);
    expect(addStatementMock).toHaveBeenCalledWith('Test statement');
  });

  // Test to check if the input is cleared after submitting the text.
  it('should clear the input after submitting the text', () => {
        // Arrange
    useStatementsManager.mockReturnValue({ addStatement: jest.fn() });
        // Render the component within StatementsContext.Provider.
        render(
      <StatementsContext.Provider value={{ statements: [] }}>

        <StatementInput />
      </StatementsContext.Provider>
    );
    const textArea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Act
    fireEvent.change(textArea, { target: { value: 'Test statement' } });
    fireEvent.click(submitButton);

    // Assert
    expect(textArea.value).toBe('');
  });

    // Test to check if the component access and interact with StatementsContext.
  it('should access and interact with StatementsContext', () => {
    // Arrange
    // Create a mock function for addStatement.
    const addStatementMock = jest.fn();
    // Mock the return value of the hook.
    useStatementsManager.mockReturnValue({ addStatement: addStatementMock });
    // Act
    // Render the component within StatementsContext.Provider.
    render(
      <StatementsContext.Provider value={{ statements: [] }}>
        <StatementInput />
      </StatementsContext.Provider>
    );
    // Get the text area
    const textArea = screen.getByRole('textbox');
    // Simulate a user typing into the text area.
    fireEvent.change(textArea, { target: { value: 'New statement' } });
        // Simulate a user clicking the submit button.
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    // Assert
    // Check if the addStatementMock has been called with the correct statement.
    expect(addStatementMock).toHaveBeenCalledWith('New statement');
  });
  });
});