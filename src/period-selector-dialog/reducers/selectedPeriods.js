import actionTypes from '../actions/actionTypes';
import { arrayHasById } from '../utils';

export const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_SELECTED_PERIODS: {
            const periods = action.periods
                .map(period => ({
                    ...period,
                    selected: false,
                }))
                .filter(period => !arrayHasById(period, state));

            return [
                ...state,
                ...periods,
            ];
        }

        case actionTypes.REMOVE_SELECTED_PERIODS: {
            return state.filter(period => !arrayHasById(period, action.periodsToRemove));
        }

        case actionTypes.TOGGLE_SELECTED_PERIOD: {
            const { index } = action;

            return [
                ...state.slice(0, index),
                {
                    ...state[index],
                    selected: !state[index].selected
                },
                ...state.slice(index + 1, state.length)
            ];
        }

        default: {
            return state;
        }
    }
};
