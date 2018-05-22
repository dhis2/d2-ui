import { periodType as reducer} from '../periodType';
import { defaultState } from '../periodType';
import actionTypes from '../../actions/actionTypes';

describe('period type reducer', () => {
    it('has default state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('handles set action', () => {
        const action = {
            type: actionTypes.SET_PERIOD_TYPE,
            payload: 'FIXED',
        };

        const expectedState = 'FIXED';

        expect(reducer(defaultState, action)).toEqual(expectedState);
    });
});
