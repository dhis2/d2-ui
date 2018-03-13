import actionTypes from '../actions/actionTypes';

export const initialState = 'RELATIVE';

export const periodType = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_PERIOD_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export default periodType;
