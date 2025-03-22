import { renderHook, act } from '@testing-library/react';
import { useStatementsManager } from '../src/hooks/useStatementsManager';
import { StatementsProvider, StatementsContext } from '../src/contexts/StatementsContext';
import { useContext } from 'react';

describe('useStatementsManager', () => {
  it('should get the statements correctly from the context', () => {
      // Arrange: Define an initial state with some statements
      const initialStatements = [
        { user: 'user1', text: 'Statement 1' },
        { user: 'user2', text: 'Statement 2' },
      ];

      // Act: Render the hook within the context with the specified initial state
      const { result } = renderHook(() => {
          const { getStatements } = useStatementsManager();
          const statements = getStatements();
          return { statements };
      }, {
          wrapper: ({ children }) => (
              <StatementsProvider initialState={initialStatements}>
                  {children}
              </StatementsProvider>
          ),
      });

      // Assert: Check if the hook returns the correct statements
      expect(result.current.statements).toEqual(initialStatements);
  });

  it('should add a new statement correctly', () => {
    // Arrange: Render the hook with a wrapper.
    const { result } = renderHook(() => {
      const { addStatement, getStatements } = useStatementsManager();
      const { statements, dispatch } = useContext(StatementsContext);
      return { addStatement, getStatements, statements, dispatch };
    }, { wrapper: StatementsProvider });

    const { addStatement, getStatements, statements } = result.current;

    // Assert: Verify initial state before adding statement.
    expect(statements).toEqual([]);

    act(() => {
      addStatement({ user: 'user1', text: 'Test statement' });
    });

    const statements = getStatements();
    expect(statements).toEqual([{ user: 'user1', text: 'Test statement' }]);
    
  });
});