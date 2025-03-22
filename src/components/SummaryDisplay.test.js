/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryDisplay } from './SummaryDisplay';
import { StatementsContext } from '../contexts/StatementsContext';
import { useSummarizeStatements } from '../hooks/useSummarizeStatements';

// Mock the useSummarizeStatements hook
jest.mock('../hooks/useSummarizeStatements');

const mockStatements = ['Statement 1', 'Statement 2'];
const mockSetStatements = jest.fn();

describe('SummaryDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // Arrange
    useSummarizeStatements.mockReturnValue({ aiResponse: null, handleSummarizeClick: jest.fn() });
        render(
      <StatementsContext.Provider value={{ statements: mockStatements, setStatements: mockSetStatements }}>
        <SummaryDisplay />
      </StatementsContext.Provider>
    );
    // Act
    render(<SummaryDisplay />);

    // Assert
    expect(screen.getByTestId('summary-display')).toBeInTheDocument();
  });

  it('should display the placeholder summary initially', () => {
    // Arrange
    useSummarizeStatements.mockReturnValue({ aiResponse: null, handleSummarizeClick: jest.fn() });
        render(
      <StatementsContext.Provider value={{ statements: mockStatements, setStatements: mockSetStatements }}>
        <SummaryDisplay />
      </StatementsContext.Provider>
    );
    // Act
    render(<SummaryDisplay />);

    // Assert
    expect(screen.getByText('AI Summary: [placeholder]')).toBeInTheDocument();
  });

  it('should display the aiResponse when it\'s available', () => {
    // Arrange
    const mockAiResponse = 'This is a test summary.';
    useSummarizeStatements.mockReturnValue({ aiResponse: mockAiResponse, handleSummarizeClick: jest.fn() });
        render(
      <StatementsContext.Provider value={{ statements: mockStatements, setStatements: mockSetStatements }}>
        <SummaryDisplay />
      </StatementsContext.Provider>
    );
    // Act
    render(<SummaryDisplay />);

    // Assert
    expect(screen.getByText(mockAiResponse)).toBeInTheDocument();
  });

    it('Should not render if there is not an aiResponse', () => {
    // Arrange
        useSummarizeStatements.mockReturnValue({ aiResponse: null, handleSummarizeClick: jest.fn() });
                render(
      <StatementsContext.Provider value={{ statements: mockStatements, setStatements: mockSetStatements }}>
        <SummaryDisplay />
      </StatementsContext.Provider>
    );

    // Act
        render(<SummaryDisplay />);

    // Assert
        expect(screen.queryByText('This is a test summary.')).not.toBeInTheDocument();
    });    

      it('Should access and interact with StatementsContext', () => {
    // Arrange
        useSummarizeStatements.mockReturnValue({ aiResponse: null, handleSummarizeClick: jest.fn() });
    
    // Act
        render(
      <StatementsContext.Provider value={{ statements: mockStatements, setStatements: mockSetStatements }}>
        <SummaryDisplay />
      </StatementsContext.Provider>
    );
    // Assert
        expect(screen.getByTestId('summary-display')).toBeInTheDocument();
  });
});