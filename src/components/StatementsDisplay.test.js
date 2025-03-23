// src/components/StatementsDisplay.test.js
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import StatementsDisplay from './StatementsDisplay';
import { useStatementsManager } from '../hooks/useStatementsManager';
import { useSummarizeStatements } from '../hooks/useSummarizeStatements';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { StatementsProvider, StatementsContext } from '../contexts/StatementsContext';

// Mock the custom hooks
jest.mock('../hooks/useStatementsManager');
jest.mock('../hooks/useSummarizeStatements');
jest.mock('../hooks/useErrorHandler');

describe('StatementsDisplay', () => {
  // Clear mock data before each test
  beforeEach(() => {
    useStatementsManager.mockClear();
    useSummarizeStatements.mockClear();
    useErrorHandler.mockClear();
  });

  // Test: Component renders without crashing
  test('renders without crashing', () => {
    // Arrange: Mock the hooks to return empty values
    useStatementsManager.mockReturnValue({ statements: [] });
    useErrorHandler.mockReturnValue({});
    // Act: Render the component
    render(<StatementsProvider><StatementsDisplay /></StatementsProvider>);
  });

  // Test: Component renders a list of statements
  test('renders a list of statements', () => {
    // Arrange: Mock the hooks to return statements
    useStatementsManager.mockReturnValue({ statements: [{ id: 1, text: 'Statement 1' }, { id: 2, text: 'Statement 2' }] });
    useErrorHandler.mockReturnValue({});
    // Act: Render the component
    render(<StatementsProvider><StatementsDisplay /></StatementsProvider>);
    // Assert: Check that the statements are rendered
    expect(screen.getByText('Statement 1')).toBeInTheDocument();
    expect(screen.getByText('Statement 2')).toBeInTheDocument();
  });

  // Test: Component renders nothing if there are no statements
  test('renders nothing if there are no statements', () => {
    // Arrange: Mock the hooks to return no statements
    useStatementsManager.mockReturnValue({ statements: [] });
    useErrorHandler.mockReturnValue({});
    // Act: Render the component
    render(<StatementsProvider><StatementsDisplay /></StatementsProvider>);
    // Assert: Check that there are not statements rendered
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  // Test: Component displays statements from the StatementsContext
  test('displays statements from the StatementsContext', () => {
    // Arrange: Define statements to be rendered
    const statements = [
      { id: 1, text: 'Statement 1' },
      { id: 2, text: 'Statement 2' },
    ];

    // Act: Render the component inside StatementsContext.Provider with specified statements
    render(
      <StatementsContext.Provider value={{ statements }}>
        <StatementsDisplay />
      </StatementsContext.Provider>
    );

    // Assert: Check that the statements are rendered
    statements.forEach((statement) => {
      expect(screen.getByText(statement.text)).toBeInTheDocument();
    });
  });
});