import { renderHook, act } from '@testing-library/react';
import { useSummarizeStatements } from './useSummarizeStatements';
import { StatementsProvider } from '../contexts/StatementsContext';

describe('useSummarizeStatements', () => {
  it('should call handleSummarizeClick without error', () => {
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider });
    const handleSummarizeClick = result.current.handleSummarizeClick;

    expect(() => act(() => {
      handleSummarizeClick();
    })).not.toThrow();
  });
});