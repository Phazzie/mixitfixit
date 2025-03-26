import React from 'react';
import { AIFeedback } from './services/AIFeedbackService';

interface FeedbackDisplayProps {
  feedback: AIFeedback | null;
  isAnalyzing: boolean;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  isAnalyzing
}) => {
  if (isAnalyzing) {
    return <div className="feedback-analyzing">Analyzing your restatement...</div>;
  }

  if (!feedback) return null;

  return (
    <div className="feedback-display">
      <div className={`accuracy-indicator ${feedback.isAccurate ? 'accurate' : 'needs-work'}`}>
        {feedback.isAccurate ? '✓ Good restatement' : '⚠ Needs improvement'}
      </div>
      
      {feedback.missingPoints.length > 0 && (
        <div className="missing-points">
          <h4>Missing Points:</h4>
          <ul>
            {feedback.missingPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {feedback.suggestions.length > 0 && (
        <div className="suggestions">
          <h4>Suggestions:</h4>
          <ul>
            {feedback.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};