import { periodType as reducer, defaultState } from '../periodType';
import actionTypes from '../../actions/actionTypes';
import PeriodTypes from '../../PeriodTypes'

describe('period type reducer', () => {
    it('has default state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('handles set action', () => {
        const action = {
            type: actionTypes.SET_PERIOD_TYPE,
            payload: PeriodTypes.FIXED,
        };

        const expectedState = PeriodTypes.FIXED;

        expect(reducer(defaultState, action)).toEqual(expectedState);
    });
});
