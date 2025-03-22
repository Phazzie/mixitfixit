// src/components/StatementsDisplay.test.js
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import StatementsDisplay from './StatementsDisplay';
import { useStatementsManager } from '../hooks/useStatementsManager';
import { useSummarizeStatements } from '../hooks/useSummarizeStatements';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { StatementsProvider } from '../contexts/StatementsContext';

jest.mock('../hooks/useStatementsManager');
jest.mock('../hooks/useSummarizeStatements');
jest.mock('../hooks/useErrorHandler');

describe('StatementsDisplay', () => {
  beforeEach(() => {
    useStatementsManager.mockClear();
    useSummarizeStatements.mockClear();
    useErrorHandler.mockClear();
  });

  test('renders correctly', () => {
    useStatementsManager.mockReturnValue({
      getStatements: jest.fn(() => [{ id: 1, statement: "test statement" }]),
      addStatement: jest.fn()
    });
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: jest.fn(() => {}),
        aiResponse: null,
        setAiResponse: jest.fn(),
        apiError: null,
      });
      useErrorHandler.mockReturnValue({
        setError: jest.fn(),
        error: null,
      });

    render(
      <StatementsProvider>
        <StatementsDisplay />
      </StatementsProvider>
    );
    expect(screen.getByText('test statement')).toBeInTheDocument();
  });

  test('calls getStatements from useStatementsManager', () => {
    const getStatementsMock = jest.fn(() => [{ id: 1, statement: "test statement" }]);
    useStatementsManager.mockReturnValue({
      getStatements: getStatementsMock,
      addStatement: jest.fn(),
    });    
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: jest.fn(),
        aiResponse: "",
        apiError: null,
      });
      useErrorHandler.mockReturnValue({
        setError: jest.fn(),
        error: null,
      });

    render(
      <StatementsProvider>
        <StatementsDisplay />
      </StatementsProvider>
    );
    expect(getStatementsMock).toHaveBeenCalled();
  });

  test('Calls the hooks functions', () => {
    const getStatementsMock = jest.fn(() => [{ id: 1, statement: "test statement" }]);
    const addStatementMock = jest.fn();
    const handleSummarizeClickMock = jest.fn();
    const setErrorMock = jest.fn();
    useStatementsManager.mockReturnValue({
        getStatements: getStatementsMock,
        addStatement: addStatementMock,
      });
    useSummarizeStatements.mockReturnValue({
        handleSummarizeClick: handleSummarizeClickMock,
        aiResponse: null,
        apiError: null,
    });
    useErrorHandler.mockReturnValue({
        setError: setErrorMock,
        error: null,
    });
    
      render(
        <StatementsProvider>
            <StatementsDisplay/>
        </StatementsProvider>
    );
    const newStatementButton = screen.getByText('Add New Statement');
    const summarizeButton = screen.getByText('Summarize with AI');
    
    act(() => {
      fireEvent.click(newStatementButton);
      fireEvent.click(summarizeButton);
    });
    
    expect(getStatementsMock).toHaveBeenCalled();
    expect(handleSummarizeClickMock).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledTimes(0);
    expect(addStatementMock).toHaveBeenCalledTimes(1);
  });

  test('displays aiResponse', () => {
    const aiResponse = "This is an AI-generated summary.";
    useStatementsManager.mockReturnValue({
      getStatements: jest.fn(() => [{ id: 1, statement: "test statement" }]),
      addStatement: jest.fn(),
    });
    useSummarizeStatements.mockReturnValue({
      handleSummarizeClick: jest.fn(),
      aiResponse: aiResponse,
      apiError: null,
    });
    useErrorHandler.mockReturnValue({
      setError: jest.fn(),
      error: null,
    });
    render(
      <StatementsProvider>
        <StatementsDisplay />
      </StatementsProvider>
    );
    expect(screen.getByText(aiResponse)).toBeInTheDocument();
  });
});