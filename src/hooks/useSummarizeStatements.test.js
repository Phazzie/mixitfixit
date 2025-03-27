import { act, renderHook } from '@testing-library/react';
import { StatementsProvider } from '../contexts/StatementsContext';
import { useSummarizeStatements } from './useSummarizeStatements';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock the getMostRecentStatement function
const mockGetMostRecentStatement = jest.fn();
jest.mock('../utils/statementUtils', () => ({
  getMostRecentStatement: (...args) => mockGetMostRecentStatement(...args)
}));

describe('useSummarizeStatements', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockGetMostRecentStatement.mockClear();
  });

  it('should initialize with null aiResponse', () => {
    // Test that the hook initializes with aiResponse as null
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    expect(result.current.aiResponse).toBeNull()
  })

  it('should initialize with null apiError', () => {
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider })
    expect(result.current.apiError).toBeNull()
  })

  it('should update aiResponse with a placeholder value when handleSummarizeClick is called', async () => {
    // Test that handleSummarizeClick updates aiResponse with a placeholder value
    const mockCode = "ABC123";
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockReturnValueOnce("User 2 statement");
    
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });

    // Assert that aiResponse is now a placeholder value
    expect(result.current.aiResponse).toBe('Placeholder summary');
  });

  it('should call handleSummarizeClick and update aiResponse with a valid summary', async () => {
    // Mock response data from the AI API
    const mockResponseData = { summary: 'This is a valid summary' };
    const mockCode = "ABC123";

    // Setup statement mocks
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockReturnValueOnce("User 2 statement");

    // Mock the global fetch function to return a successful response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });

    // Render the hook within the StatementsProvider
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });

    // Call the handleSummarizeClick function and wait for the async operation to complete
    await act(async () => {
      await result.current.handleSummarizeClick();
    });

    expect(result.current.aiResponse).toEqual(mockResponseData.summary);
  });

  it('should call handleSummarizeClick and set apiError when fetch fails', async () => {
    // Mock a rejected promise to simulate a network error
    const mockCode = "ABC123";
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockReturnValueOnce("User 2 statement");
    
    fetch.mockRejectedValue(new Error('Network error'));

    // Render the hook within the StatementsProvider
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });

    // Call the handleSummarizeClick function and wait for the async operation to complete
    await act(async () => {
      await result.current.handleSummarizeClick();
    });

    expect(result.current.apiError).toBe('Failed to fetch summary: Error: Network error');
  });

  it('should call handleSummarizeClick and set apiError when response is not ok', async () => {
    const mockCode = "ABC123";
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockReturnValueOnce("User 2 statement");
    
    fetch.mockResolvedValue({ ok: false, statusText: 'Not Found' });
    
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider })
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    expect(result.current.apiError).toBe('Failed to fetch summary: Not Found')
  });

  // New tests for code-specific functionality
  it('should handle missing code parameter', async () => {
    const { result } = renderHook(() => useSummarizeStatements(), { wrapper: StatementsProvider });
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    expect(result.current.apiError).toBe('Cannot summarize: No session code provided');
  });

  it('should handle missing statements from getMostRecentStatement', async () => {
    const mockCode = "ABC123";
    // Mock first statement available, second one missing
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockImplementationOnce(() => { throw new Error("No statement found"); });
    
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    expect(result.current.apiError).toBe('Error: No statement found');
  });

  it('should handle empty statements', async () => {
    const mockCode = "ABC123";
    // Mock empty statements
    mockGetMostRecentStatement
      .mockReturnValueOnce("")
      .mockReturnValueOnce("");
    
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    expect(result.current.apiError).toBe('Cannot summarize: One or both statements are empty');
  });
  
  it('should clear previous API error when starting a new request', async () => {
    const mockCode = "ABC123";
    mockGetMostRecentStatement
      .mockReturnValueOnce("User 1 statement")
      .mockReturnValueOnce("User 2 statement");
    
    // First set an error
    fetch.mockRejectedValueOnce(new Error('Initial error'));
    
    const { result } = renderHook(() => useSummarizeStatements(mockCode), { wrapper: StatementsProvider });
    
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    expect(result.current.apiError).toBe('Failed to fetch summary: Error: Initial error');
    
    // Reset mock for success
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ summary: 'Success response' }),
    });
    
    // Make a successful request
    await act(async () => {
      await result.current.handleSummarizeClick();
    });
    
    // Error should be cleared
    expect(result.current.apiError).toBeNull();
    expect(result.current.aiResponse).toBe('Success response');
  });
});