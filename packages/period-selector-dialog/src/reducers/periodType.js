import actionTypes from '../actions/actionTypes';
import PeriodTypes from '../PeriodTypes'

export const defaultState = PeriodTypes.RELATIVE;

export const periodType = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.SET_PERIOD_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export default periodType;
