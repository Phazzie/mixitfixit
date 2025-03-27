import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from './Summary';
import { SummaryProvider } from '../contexts/SummaryContext';
import { StatementsProvider } from '../contexts/StatementsContext';

const mockSummaryData = {
  issue: 'Test Issue',
  statements: [
    { userId: '1', content: 'Statement 1' },
    { userId: '2', content: 'Statement 2' }
  ],
  keyPoints: ['Key point 1', 'Key point 2'],
  resolution: 'Test Resolution',
  timestamp: '2024-01-01T12:00:00Z'
};

describe('Summary Component', () => {
  const renderWithProviders = (component) => {
    return render(
      <StatementsProvider>
        <SummaryProvider>
          {component}
        </SummaryProvider>
      </StatementsProvider>
    );
  };

  test('renders all summary sections', () => {
    renderWithProviders(<Summary />);
    
    expect(screen.getByTestId('summary-section')).toBeInTheDocument();
    expect(screen.getByText('Issue')).toBeInTheDocument();
    expect(screen.getByText('Statements')).toBeInTheDocument();
    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('Resolution')).toBeInTheDocument();
  });

  test('displays formatted timestamp', () => {
    renderWithProviders(<Summary />);
    
    const dateString = new Date(mockSummaryData.timestamp)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    
    expect(screen.getByText(/Generated on:/)).toBeInTheDocument();
  });

  test('displays all statements', () => {
    renderWithProviders(<Summary />);
    
    mockSummaryData.statements.forEach(statement => {
      expect(screen.getByText(statement.content)).toBeInTheDocument();
    });
  });
});