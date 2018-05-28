import actionTypes from '../actions/actionTypes';

export const defaultState = 'RELATIVE';

export const periodType = (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.SET_PERIOD_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export default periodType;
