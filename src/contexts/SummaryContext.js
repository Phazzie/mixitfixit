import React, { createContext, useContext, useState } from 'react';

const SummaryContext = createContext();

/**
 * Provider component for managing summary state
 * @param {Object} props - Component props
 */
export function SummaryProvider({ children }) {
  const [summaryData, setSummaryData] = useState({
    issue: '',
    statements: [],
    keyPoints: [],
    resolution: '',
    timestamp: null
  });

  const updateSummaryData = (newData) => {
    setSummaryData(current => ({
      ...current,
      ...newData,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <SummaryContext.Provider value={{ summaryData, updateSummaryData }}>
      {children}
    </SummaryContext.Provider>
  );
}

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error('useSummary must be used within a SummaryProvider');
  }
  return context;
};