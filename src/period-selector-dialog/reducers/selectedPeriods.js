import actionTypes from '../actions/actionTypes';
import _ from 'lodash';

export const initialState = {};

export const selectedPeriods = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_SELECTED_PERIOD:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case actionTypes.REMOVE_SELECTED_PERIOD:
            return _.omit(state, [action.payload.id]);
        default:
            return state;
    }
};

export default selectedPeriods;
