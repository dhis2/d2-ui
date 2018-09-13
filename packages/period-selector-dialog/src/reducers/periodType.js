import actionTypes from '../actions/actionTypes';
import periodTypes from '../PeriodTypes';

export const defaultState = periodTypes.RELATIVE;

export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.SET_PERIOD_TYPE:
        return action.payload;
    default:
        return state;
    }
};
