import { statementsReducer } from './StatementsContext.js';

describe('statementsReducer', () => {
    it('should add a statement', () => {
        const initialState = [];
        const newStatement = { user: '1', text: 'Test statement' };
        const action = { type: 'ADD_STATEMENT', payload: newStatement };
        const newState = statementsReducer(initialState, action);
        expect(newState).toEqual([newStatement]);
    });

    it('should remove a statement', () => {
        const statement1 = { user: '1', text: 'Statement 1' };
        const statement2 = { user: '2', text: 'Statement 2' };
        const initialState = [statement1, statement2];
        const action = { type: 'REMOVE_STATEMENT', payload: 0 };