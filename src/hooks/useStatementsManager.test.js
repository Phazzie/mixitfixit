// Import necessary modules from testing library and React
import { act, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import {
  StatementsContext,
  StatementsProvider,
} from '../contexts/StatementsContext';
import { useStatementsManager } from './useStatementsManager';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    throwError: jest.fn(() => {
      throw new Error('localStorage error');
    }),
  };
})();

// Mock the dataManager module
jest.mock('../data/dataManager', () => ({
  saveStatement: jest.fn(),
  loadStatements: jest.fn(),
}));

// Import the mocked module
import * as dataManager from '../data/dataManager';

// Describe the test suite for useStatementsManager hook
describe('useStatementsManager', () => {
  // Setup for tests
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementation for each test
    dataManager.saveStatement.mockImplementation((code, statement) => {
      return Promise.resolve();
    });
    dataManager.loadStatements.mockImplementation((code) => {
      return Promise.resolve([]);
    });
  });

  /**
   * Test case: should get the statements correctly from the context.
   * This test verifies that the hook can retrieve the correct statements from the context.
   */
  it('should get the statements correctly from the context', () => {
    // Arrange: Define an initial state with some statements.
    // The initial state is an array of statements.
    const initialStatements = [
      { user: 'user1', text: 'Statement 1' },
      { user: 'user2', text: 'Statement 2' },
    ];

    // Act: Render the hook within the context with the specified initial state
    const { result } = renderHook(() => {
      // Get the getStatements function from useStatementsManager
      const { getStatements } = useStatementsManager();
      // Get all the statements.
      const statements = getStatements();
      return { statements };
    }, {
      // Wrap the component with the StatementsProvider.
      wrapper: ({ children }) => (
        <StatementsProvider initialState={initialStatements}>
          {children}
        </StatementsProvider>
      ),
    });

    // Assert: Check if the hook returns the correct statements
    expect(result.current.statements).toEqual(initialStatements);
  });

  /**
   * Test case: should add a new statement correctly.
   * This test verifies that the hook can add a new statement to the context correctly.
   */
  it('Should add a new statement correctly', () => {
    // Arrange: Render the hook with a wrapper.
    // Get the addStatement, getStatements, statements and dispatch from the useStatementsManager hook.
    const { result } = renderHook(() => {
      const { addStatement, getStatements } = useStatementsManager();
      const { statements, dispatch } = useContext(StatementsContext);
      return { addStatement, getStatements, statements, dispatch };
    }, { wrapper: StatementsProvider });

    // Get the functions from the result.current
    const { addStatement, getStatements, statements } = result.current;

    // Assert: Verify initial state before adding statement.
    expect(statements).toEqual([]);

    // Act: Add a new statement using the addStatement function.
    act(() => {
      addStatement('Test statement'); // Simulate adding a new statement.
    });

    // Get the statements.
    const statements = getStatements();
    // Assert: Check that the statements are correct.
    expect(statements).toEqual([{ user: 'user1', text: 'Test statement' }]);

  });

  /**
   * Test case: should handle errors when adding a statement.
   * This test verifies that the hook can handle errors when an invalid statement is added.
   */
  it('Should handle errors when adding a statement', () => {
    // Arrange: Mock the console.error function to spy on error messages
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Act: Render the hook with a wrapper.
    // Get the addStatement function from the useStatementsManager hook.
    const { result } = renderHook(() => {
      const { addStatement } = useStatementsManager();
      return { addStatement };
    }, { wrapper: StatementsProvider });

    const { addStatement } = result.current;

    // Act: Add an invalid statement (without user or text)
    act(() => {
      // We need to catch the error in a try catch, because the code throws an error.
      try {
        addStatement({});
      } catch (error) {
        // Catch the error
      }
    }); // Simulate adding an invalid statement.

    // Assert: Verify that the console.error has been called with the expected message
    expect(console.error).toHaveBeenCalledWith(
      'Invalid statement: user and text are required',
    );

    // Restore the original console.error function
    console.error = originalConsoleError;
  });

  /**
   * Test case: should not add empty statements.
   * This test verifies that the hook does not add an empty statement to the context.
   */
  it('Should not add empty statements', () => {
    // Arrange: Get the addStatement and getStatements from the useStatementsManager hook.
    const { result } = renderHook(() => {
      const { addStatement, getStatements } = useStatementsManager();
      return { addStatement, getStatements };
    }, { wrapper: StatementsProvider });

    const { addStatement, getStatements } = result.current;

    // Act: Try to add an empty statement.
    act(() => {
      addStatement({ user: 'user1', text: '' }); // Simulate adding an empty statement.
    });

    // Get the statements.
    const statements = getStatements();

    // Assert: Check that the statements are still empty.
    expect(statements).toEqual([]);
  });

  /**
   * Test case: should handle adding multiple statements.
   * This test verifies that the hook can handle adding multiple statements to the context.
   */
  it('Should handle adding multiple statements', () => {
    // Arrange: Get the addStatement and getStatements from the useStatementsManager hook.
    const { result } = renderHook(() => {
      const { addStatement, getStatements } = useStatementsManager();
      return { addStatement, getStatements };
    }, { wrapper: StatementsProvider });

    const { addStatement, getStatements } = result.current;

    // Act: Add multiple statements.
    act(() => {
      addStatement({ user: 'user1', text: 'Statement 1' });
      addStatement({ user: 'user2', text: 'Statement 2' });
      addStatement({ user: 'user3', text: 'Statement 3' });
    }); // Simulate adding multiple statements.

    // Get the statements.
    const statements = getStatements();

    // Assert: Check that the statements are correct.
    expect(statements).toEqual([
      { user: 'user1', text: 'Statement 1' },
      { user: 'user2', text: 'Statement 2' },
      { user: 'user3', text: 'Statement 3' },
    ]);
  });

  /**
   * Test case: Should remove a statement from the statements array by index.
   * This test verifies that the hook can remove a statement from the statements array.
   */
  it('Should remove a statement from the statements array by index', () => {
    // Arrange: Get the addStatement, getStatements and removeStatement from the useStatementsManager hook.
    const { result } = renderHook(() => {
      const { addStatement, getStatements, removeStatement } =
        useStatementsManager();
      return { addStatement, getStatements, removeStatement };
    }, { wrapper: StatementsProvider });

    const { addStatement, getStatements, removeStatement } = result.current;

    // Act: Add multiple statements.
    act(() => {
      addStatement({ user: 'user1', text: 'Statement 1' });
    }); // Simulate adding a statement.

    // Act: Remove the statement by index.
    act(() => {
      removeStatement(0); // Simulate removing the statement at index 0.
    });

    // Get the statements.
    const statements = getStatements();

    // Assert: Check that the statement has been removed.
    expect(statements).toEqual([]);
    // Act: Remove the statement by index.
    act(() => {
      removeStatement(0); // Simulate removing the statement at index 0.
    });

    // Get the statements.
    const statements = getStatements();

    // Assert: Check that the statement has been removed.
    expect(statements).toEqual([]);
  });

  /**
   * Test case: should maintain statements between renders.
   * This test verifies that the hook maintains state across re-renders.
   */
  it('should maintain statements between renders', () => {
    // Arrange: Create a hook with a wrapper
    const { result, rerender } = renderHook(() => {
      const { addStatement, getStatements } = useStatementsManager();
      return { addStatement, getStatements };
    }, { wrapper: StatementsProvider });

    // Act: Add a statement
    act(() => {
      result.current.addStatement({ user: 'user1', text: 'Persistent statement' });
    });

    // Verify statement was added
    expect(result.current.getStatements()).toEqual([
      { user: 'user1', text: 'Persistent statement' }
    ]);

    // Re-render the hook
    rerender();

    // Assert: Statement should still exist after re-render
    expect(result.current.getStatements()).toEqual([
      { user: 'user1', text: 'Persistent statement' }
    ]);
  });

  /**
   * Test case: should handle localStorage errors gracefully.
   * This test verifies that the hook can handle localStorage errors.
   */
  it('should handle localStorage errors gracefully', async () => {
    // Mock console.error to capture error messages
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Mock saveStatement to throw an error
    dataManager.saveStatement.mockImplementation(() => {
      throw new Error('Failed to save to localStorage');
    });

    // Arrange: Render the hook
    const { result } = renderHook(() => useStatementsManager('test-code'), { 
      wrapper: StatementsProvider 
    });

    // Act: Try to add a statement which will fail to save
    await act(async () => {
      await result.current.addStatement({ user: 'user1', text: 'This will fail to save' });
    });

    // Assert: Error should be logged
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to save to localStorage')
    );

    // Restore console.error
    console.error = originalConsoleError;
  });

  /**
   * Test case: should handle invalid input in addStatement.
   * This test verifies that the hook validates input properly.
   */
  it('should handle invalid input in addStatement', () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useStatementsManager(), { 
      wrapper: StatementsProvider 
    });

    // Act: Try to add various invalid statements
    act(() => {
      // Try with null
      result.current.addStatement(null);
      // Try with undefined
      result.current.addStatement(undefined);
      // Try with empty object
      result.current.addStatement({});
      // Try with missing text
      result.current.addStatement({ user: 'user1' });
      // Try with missing user
      result.current.addStatement({ text: 'No user' });
    });

    // Assert: No statements should be added
    expect(result.current.getStatements()).toEqual([]);
  });

  /**
   * Test case: should handle concurrent statement additions correctly.
   * This test verifies that the hook can handle concurrent operations.
   */
  it('should handle concurrent statement additions correctly', async () => {
    // Arrange: Render the hook
    const { result } = renderHook(() => useStatementsManager(), { 
      wrapper: StatementsProvider 
    });

    // Act: Add multiple statements concurrently
    await act(async () => {
      // Create an array of promises for adding statements
      const promises = [
        result.current.addStatement({ user: 'user1', text: 'Concurrent 1' }),
        result.current.addStatement({ user: 'user1', text: 'Concurrent 2' }),
        result.current.addStatement({ user: 'user1', text: 'Concurrent 3' })
      ];
      // Wait for all promises to resolve
      await Promise.all(promises);
    });

    // Assert: All statements should be added in order
    expect(result.current.getStatements()).toEqual([
      { user: 'user1', text: 'Concurrent 1' },
      { user: 'user1', text: 'Concurrent 2' },
      { user: 'user1', text: 'Concurrent 3' }
    ]);
  });

  /**
   * Test case: should handle localStorage loading errors.
   * This test verifies that the hook can handle errors when loading from localStorage.
   */
  it('should handle localStorage loading errors', async () => {
    // Mock console.error to capture error messages
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Mock loadStatements to throw an error
    dataManager.loadStatements.mockImplementationOnce(() => {
      throw new Error('Failed to load from localStorage');
    });

    // Arrange & Act: Render the hook which should try to load statements
    const { result } = renderHook(() => useStatementsManager('test-code'), { 
      wrapper: StatementsProvider 
    });

    // Assert: Error should be logged
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to load from localStorage')
    );

    // The statements should be an empty array as a fallback
    expect(result.current.getStatements()).toEqual([]);

    // Restore console.error
    console.error = originalConsoleError;
  });
});