import actionTypes from '../actions/actionTypes';
import { RELATIVE } from '../utils/periodTypes';

export const defaultState = RELATIVE;

export default (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.SET_PERIOD_TYPE:
        return action.payload;
    default:
        return state;
    }
};
