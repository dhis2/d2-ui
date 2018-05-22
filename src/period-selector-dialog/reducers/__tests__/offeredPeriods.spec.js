import { periods } from '../periods';
import { defaultState } from '../periods';
import actionTypes from '../../actions/actionTypes';

const reducer = periods('offered');

describe('offered periods reducer', () => {
    it('has default state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('handles set offered periods action', () => {
        const action = {
            type: actionTypes.SET_OFFERED_PERIODS,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const expectedState = {
            ...defaultState,
            periods: action.periods,
        };

        expect(reducer(defaultState, action)).toEqual(expectedState);
    });

    it('handles add offered periods action', () => {
        const sortArrayByItemId = (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;

            return 0;
        };

        const action = {
            type: actionTypes.ADD_OFFERED_PERIODS,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const currentState = {
            ...defaultState,
            periods: [
                { id: 'THIS_WEEK', name: 'This week', 'selected': false },
                { id: 'LAST_WEEK', name: 'Last week', 'selected': false },
            ]
        };

        const expectedState = {
            ...defaultState,
            periods: [
                ...action.periods,
                ...currentState.periods,
            ],
        };

        const actualState = reducer(currentState, action);

        // compare states except periods
        expect({
            ...expectedState,
            periods: [],
        }).toEqual({
            ...actualState,
            periods: [],
        });

        // compare states sorted periods
        expect(expectedState.periods.sort(sortArrayByItemId)).toEqual(actualState.periods.sort(sortArrayByItemId));
    });

    it('handles remove offered periods', () => {
        const action = {
            type: actionTypes.REMOVE_OFFERED_PERIODS,
            periodsToRemove: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const currentState = {
            ...defaultState,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const expectedState = {
            ...defaultState,
            periods: [],
        };

        // remove all periods
        expect(reducer(currentState, action)).toEqual(expectedState);
    });

    it('handles toggle offered period action', () => {
        const currentState = {
            ...defaultState,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const action = {
            type: actionTypes.TOGGLE_OFFERED_PERIOD,
            period: { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
            index: 0,
        };

        const expectedState = {
            ...defaultState,
            lastClickedIndex: action.index,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': true },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const actualState = reducer(currentState, action);

        expect(actualState).toEqual(expectedState);
    });
});

