import { sorting as reducer, actionTypes } from '../index';

describe('sorting reducer', () => {
    it('handles the sort order action', () => {
        const newOrder = 'any which way';
        const action = {
            type: actionTypes.SET_SORT_ORDER,
            payload: newOrder,
        };

        const expectedState = {
            order: newOrder,
            column: 'col',
        };

        expect(reducer({ order: 'asc', column: 'col' }, action)).toEqual(expectedState);
    });

    it('handles the sort column action', () => {
        const newColumn = 'any which column';
        const action = {
            type: actionTypes.SET_SORT_COLUMN,
            payload: newColumn,
        };

        const expectedState = {
            order: 'asc',
            column: newColumn,
        };

        expect(reducer({ order: 'asc', column: 'col' }, action)).toEqual(expectedState);
    });
});
