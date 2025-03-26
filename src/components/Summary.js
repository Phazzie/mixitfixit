import React from 'react';
import { useSummary } from '../contexts/SummaryContext';
import { useSteelManning } from '../hooks/useSteelManning';
import { useStatements } from '../contexts/StatementsContext';

/**
 * Summary component displays the final summary of the discussion
 * including the issue, statements, and resolution
 */
const Summary = () => {
  const { summaryData } = useSummary();
  const { steelManningState } = useSteelManning();
  const { statements } = useStatements();

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="summary-container" data-testid="summary-section">
      <h2>Discussion Summary</h2>
      
      <section className="summary-section">
        <h3>Issue</h3>
        <p>{summaryData.issue}</p>
      </section>

      <section className="summary-section">
        <h3>Statements</h3>
        <div className="statements-list">
          {statements.map((statement, index) => (
            <div key={index} className="statement-item">
              <strong>Participant {statement.userId}:</strong>
              <p>{statement.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="summary-section">
        <h3>Key Points</h3>
        <ul>
          {summaryData.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="summary-section">
        <h3>Resolution</h3>
        <p>{summaryData.resolution}</p>
      </section>

      <footer className="summary-footer">
        <p>Generated on: {formatDate(summaryData.timestamp)}</p>
      </footer>
    </div>
  );
};

export default Summary;