import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { StatementsProvider } from './src/contexts/StatementsContext';
import { useStatementsManager } from './src/hooks/useStatementsManager';
import { useSummarizeStatements } from './src/hooks/useSummarizeStatements';
import { useErrorHandler } from './src/hooks/useErrorHandler';
import StatementInput from './src/components/StatementInput';
import StatementsDisplay from './src/components/StatementsDisplay';
import SummarizeButton from './src/components/SummarizeButton';
import SummaryDisplay from './src/components/SummaryDisplay';
import IssueProposal from './src/components/IssueProposal';
import ErrorDisplay from './src/components/ErrorDisplay';

// Mock the custom hooks
jest.mock('./src/hooks/useStatementsManager');
jest.mock('./src/hooks/useSummarizeStatements');
jest.mock('./src/hooks/useErrorHandler');
describe('App Component', () => {    
  beforeEach(() => {  
    useStatementsManager.mockClear();
    useSummarizeStatements.mockClear();
    useErrorHandler.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <StatementsProvider>
        <App />
      </StatementsProvider> 
    );
    // Assert that the component renders without crashing
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

    it('Should render all child components', () => {
        // Render the component
    render(
        <StatementsProvider>
            <App />
        </StatementsProvider>
    );
    //check if all the components are present
    expect(screen.getByTestId('statement-input')).toBeInTheDocument();
    expect(screen.getByTestId('issue-proposal')).toBeInTheDocument();
    expect(screen.getByTestId('statements-display')).toBeInTheDocument();
    expect(screen.getByTestId('summarize-button')).toBeInTheDocument();
    expect(screen.getByTestId('summary-display')).toBeInTheDocument();
    expect(screen.getByTestId('error-display')).toBeInTheDocument();
    });

  it('Should provide the `StatementsContext` to its children', () => {
     // Render the component
    render(
        <StatementsProvider>
        <App />
      </StatementsProvider>
    );
    expect(screen.getByRole('heading', { name: /Statements/i })).toBeInTheDocument();
  });

  it('calls useStatementsManager hook', () => {
    render(
      <StatementsProvider>
        <App />
      </StatementsProvider>
    );
    expect(useStatementsManager).toHaveBeenCalled();
  });

  it('calls useSummarizeStatements hook', () => {
    render(
      <StatementsProvider>
        <App />
      </StatementsProvider>
    );
    expect(useSummarizeStatements).toHaveBeenCalled();
  });


  it('calls addStatement function', async () => {
        // Mock the hooks to return some data
        const addStatement = jest.fn();
        useStatementsManager.mockReturnValue({
            getStatements: () => [],
            addStatement: addStatement,
        });
        useSummarizeStatements.mockReturnValue({
            handleSummarizeClick: jest.fn(),
            aiResponse: null,
        });
        useErrorHandler.mockReturnValue({
            error: null,
            setError: jest.fn(),
        });
        
        render(
            <StatementsProvider>
                <App />
            </StatementsProvider>
        );
        //check if the button is present

        // Act: Simulate a user interaction that should call addStatement
        const button = screen.getByRole('button', { name: /Add New Statement/i });
        await act(async () => {
            button.click();
        });

        // Assert that addStatement was called
        expect(addStatement).toHaveBeenCalled();
    }); 

    it('calls handleSummarizeClick function', async () => {
        // Mock the hooks to return some data
        const handleSummarizeClick = jest.fn();
        useStatementsManager.mockReturnValue({
            getStatements: () => [],
            addStatement: jest.fn(),
        });
        useSummarizeStatements.mockReturnValue({
            handleSummarizeClick: handleSummarizeClick,
            aiResponse: null,
        });
        useErrorHandler.mockReturnValue({
            error: null,
            setError: jest.fn(),
        });
        
        render(
            <StatementsProvider>
                <App />
            </StatementsProvider>
        );

        // Act: Simulate a user interaction that should call handleSummarizeClick
        const button = screen.getByRole('button', { name: /Summarize with AI/i });
        await act(async () => {
            button.click();
        });

        // Assert that handleSummarizeClick was called
        expect(handleSummarizeClick).toHaveBeenCalled();
    });

});
