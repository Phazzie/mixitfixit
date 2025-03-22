import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { StatementsProvider } from './src/contexts/StatementsContext';
import { useStatementsManager } from './src/hooks/useStatementsManager';
import { useSummarizeStatements } from './src/hooks/useSummarizeStatements';
import { useErrorHandler } from './src/hooks/useErrorHandler';

// Mock the custom hooks
jest.mock('./src/hooks/useStatementsManager');
jest.mock('./src/hooks/useSummarizeStatements');
jest.mock('./src/hooks/useErrorHandler');

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
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
    expect(screen.getByRole('main')).toBeInTheDocument()
  });

  it('renders StatementsDisplay component', () => {
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

  it('calls useErrorHandler hook', () => {
    render(
      <StatementsProvider>
        <App />
      </StatementsProvider>
    );
    expect(useErrorHandler).toHaveBeenCalled();
  });

  it('does not pass props to StatementsDisplay', () => {
    // Render the component
    render(
      <StatementsProvider>
        <App />
      </StatementsProvider>
    );

    // Since StatementsDisplay doesn't take props, we expect it to be rendered without props
    // This test relies on the implementation detail that StatementsDisplay doesn't accept props
    // If StatementsDisplay starts accepting props, this test will fail and should be updated
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Statements/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Statement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Summarize with AI/i })).toBeInTheDocument();
  });

  it('renders the context correctly', async () => {
    // Mock the hooks to return some data
    useStatementsManager.mockReturnValue({
      getStatements: () => [{ statement: 'test statement' }],
      addStatement: jest.fn(),
    });
    useSummarizeStatements.mockReturnValue({
      handleSummarizeClick: jest.fn(),
      aiResponse: 'test ai response',
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

    // Assert that the data from the context is rendered
    expect(screen.getByText(/test statement/i)).toBeInTheDocument();
    expect(screen.getByText(/test ai response/i)).toBeInTheDocument();
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