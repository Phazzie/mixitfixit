import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SummarizeButton from './SummarizeButton';
import { StatementsContext } from '../contexts/StatementsContext';
import { useStatementsManager } from '../hooks/useStatementsManager';
import { useSummarizeStatements } from '../hooks/useSummarizeStatements';
import { act } from 'react-dom/test-utils';

// Mock the custom hooks
jest.mock('../hooks/useStatementsManager');
jest.mock('../hooks/useSummarizeStatements');

describe('SummarizeButton', () => {
  // Test to check if the component renders without crashing
  it('renders without crashing', () => {
    // Mock the handleSummarizeClick function
    // Mock the handleSummarizeClick function
    const mockHandleSummarizeClick = jest.fn();
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: mockHandleSummarizeClick,
      });

    render(
        <StatementsContext.Provider value={{ statements: [] }}>
            <SummarizeButton />
        </StatementsContext.Provider>
    );
  });

  // Test to check if the component renders a button labeled "Summarize"
  it('renders a button labeled "Summarize"', () => {
    // Mock the handleSummarizeClick function
    const mockHandleSummarizeClick = jest.fn();
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: mockHandleSummarizeClick,
      });

    render(
        <StatementsContext.Provider value={{ statements: [] }}>
            <SummarizeButton />
        </StatementsContext.Provider>
    );
    // Check if the button is in the document
    expect(screen.getByRole('button', { name: /Summarize/i })).toBeInTheDocument();
  });

  // Test to check if handleSummarizeClick is called when the button is clicked
  it('calls handleSummarizeClick from useSummarizeStatements when clicked', () => {
    // Mock the handleSummarizeClick function
    const mockHandleSummarizeClick = jest.fn();
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: mockHandleSummarizeClick,
      });

    render(
        <StatementsContext.Provider value={{ statements: [] }}>
            <SummarizeButton />
        </StatementsContext.Provider>
    );
    // Click on the button
    fireEvent.click(screen.getByRole('button', { name: /Summarize/i }));
    // Check if the mock function has been called
    expect(mockHandleSummarizeClick).toHaveBeenCalledTimes(1);
  });

    // Test to check if the component access and interact with StatementsContext
    it('should access and interact with StatementsContext', () => {
        // Create a mock statement
        const mockStatements = ['Statement 1', 'Statement 2'];
        // Mock the handleSummarizeClick function
        const mockHandleSummarizeClick = jest.fn();
        useSummarizeStatements.mockReturnValue({
          handleSummarizeClick: mockHandleSummarizeClick,
        });
    
        // Render the component with the mock statements
        act(() => {
          render(
            <StatementsContext.Provider value={{ statements: mockStatements }}>
              <SummarizeButton />
            </StatementsContext.Provider>
          );
        });
    
        // Check if the button is in the document
        expect(screen.getByRole('button', { name: /Summarize/i })).toBeInTheDocument();
        // Click on the button
        fireEvent.click(screen.getByRole('button', { name: /Summarize/i }));
        // Check if the mock function has been called
        expect(mockHandleSummarizeClick).toHaveBeenCalledTimes(1);
      });
});