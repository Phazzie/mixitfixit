
import { renderHook, act } from '@testing-library/react'
import { useSummarizeStatements } from './useSummarizeStatements';
import { StatementsProvider } from '../contexts/StatementsContext'

// Mock the global fetch function
global.fetch = jest.fn();

describe('useSummarizeStatements', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock calls before each test to isolate tests
  });

  it('should initialize with null aiResponse', () => {
    // Test that the hook initializes with aiResponse as null
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    expect(result.current.aiResponse).toBeNull()
  })

  it('should update aiResponse with a placeholder value when handleSummarizeClick is called', async () => {
    // Test that handleSummarizeClick updates aiResponse with a placeholder value
        const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider });
        const { handleSummarizeClick } = result.current;

        await act(async () => {
            await handleSummarizeClick();
        });

        // Assert that aiResponse is now a placeholder value
        expect(result.current.aiResponse).toBe('Placeholder summary');
    });

    it('should call handleSummarizeClick and update aiResponse with a valid summary', async () => {
        // Mock response data from the AI API
        const mockResponseData = { summary: 'This is a valid summary' };

        // Mock the global fetch function to return a successful response
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponseData),
        });

        // Render the hook within the StatementsProvider
        const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider });
        const { handleSummarizeClick } = result.current;

        // Call the handleSummarizeClick function and wait for the async operation to complete
        await act(async () => {
            await handleSummarizeClick();
        });

    expect(result.current.aiResponse).toEqual(mockResponseData.summary);
    });

  it('should call handleSummarizeClick and set error when fetch fails', async () => {
    // Mock a rejected promise to simulate a network error
        fetch.mockRejectedValue(new Error('Network error'));

        // Render the hook within the StatementsProvider
        const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider });
        const { handleSummarizeClick } = result.current;

        // Call the handleSummarizeClick function and wait for the async operation to complete
        await act(async () => {
            await handleSummarizeClick();
        });

        expect(result.current.error).toBe('Failed to fetch summary: Error: Network error');
  });

  it('should call handleSummarizeClick and set error when response is not ok', async () => {
        fetch.mockResolvedValue({ ok: false, statusText: 'Not Found' });
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    expect(result.current.apiError).toBe('Failed to fetch summary: Not Found')
  });
});