import { statementsReducer } from './StatementsContext.js';

describe('statementsReducer', () => {
    it('should add a statement', () => {
        const initialState = [];
        const newStatement = { user: '1', text: 'Test statement' };
        const action = { type: 'ADD_STATEMENT', payload: newStatement };
        const newState = statementsReducer(initialState, action);
        expect(newState).toEqual([newStatement]);
    });
});