import { renderHook, act } from '@testing-library/react'
import { useStatements } from '../contexts/StatementsContext'
import { useSummarizeStatements } from './useSummarizeStatements';
import { StatementsProvider } from '../contexts/StatementsContext'

// Mock the global fetch function
global.fetch = jest.fn();

describe('useSummarizeStatements', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock calls before each test
  });

  it('should initialize with null aiResponse and apiError', () => {
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    expect(result.current.aiResponse).toBeNull()
    expect(result.current.apiError).toBeNull()
  })

  it('should call handleSummarizeClick and update aiResponse', async () => {
    const mockResponseData = { summary: 'Test summary' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });

    const { result, waitForNextUpdate } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    const { handleSummarizeClick } = result.current;

    await act(async () => {
      await handleSummarizeClick();
    });

    expect(result.current.aiResponse).toEqual(mockResponseData.summary);
  });

  it('should call handleSummarizeClick and set apiError when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    const { handleSummarizeClick } = result.current;

    await act(async () => {
      await handleSummarizeClick();
    });

    expect(result.current.apiError).toBe('Failed to fetch summary: Error: Network error');
  });

  it('should handle non-ok response', async () => {
    fetch.mockResolvedValue({ ok: false, statusText: 'Not Found' });
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    expect(result.current.apiError).toBe('Failed to fetch summary: Not Found')
  });
});