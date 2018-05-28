import { periods } from '../periods';
import { defaultState } from '../periods';
import actionTypes from '../../actions/actionTypes';

const testPeriods = (reducer, periodType) => () => {
    it('has default state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('handles set periods action', () => {
        const action = {
            type: actionTypes[`SET_${periodType.toUpperCase()}_PERIODS`],
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

    it('handles add periods action', () => {
        const sortArrayByItemId = (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;

            return 0;
        };

        const action = {
            type: actionTypes[`ADD_${periodType.toUpperCase()}_PERIODS`],
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

    it('handles remove periods', () => {
        const action = {
            type: actionTypes[`REMOVE_${periodType.toUpperCase()}_PERIODS`],
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

    it('handles toggle period action', () => {
        const currentState = {
            ...defaultState,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': false },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
            ],
        };

        const action = {
            type: actionTypes[`TOGGLE_${periodType.toUpperCase()}_PERIOD`],
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

    it('handles shift selection', () => {
        const currentState = {
            ...defaultState,
            lastClickedIndex: 0,
            periods: [
                { id: 'LAST_12_MONTHS', name: 'Last 12 months', 'selected': true },
                { id: 'LAST_14_DAYS', name: 'Last 14 days', 'selected': false },
                { id: 'THIS_WEEK', name: 'This week', 'selected': false },
                { id: 'LAST_WEEK', name: 'Last week', 'selected': false },
            ],
        };

        const action = {
            type: actionTypes[`TOGGLE_${periodType.toUpperCase()}_PERIOD`],
            period: { id: 'LAST_WEEK', name: 'Last week', 'selected': false },
            index: 3,
            isShiftPressed: true,
        };

        const expectedState = {
            ...currentState,
            periods: currentState.periods.map(period => ({
                ...period,
                selected: true,
            })),
        };

        expect(reducer(currentState, action)).toEqual(expectedState);
    });
};

describe('offered periods reducer', testPeriods(periods('offered'), 'offered'));
describe('selected periods reducer', testPeriods(periods('selected'), 'selected'));
