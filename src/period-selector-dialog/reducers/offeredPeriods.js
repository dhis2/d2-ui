import actionTypes from '../actions/actionTypes';
import { arrayHasById } from '../utils';

export const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_OFFERED_PERIODS: {
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

        case actionTypes.SET_OFFERED_PERIODS: {
            return action.periods.map(period => ({
                ...period,
                selected: false,
            }));
        }

        case actionTypes.REMOVE_OFFERED_PERIODS: {
            const { periodsToRemove } = action;

            return state.filter(period => !arrayHasById(period, periodsToRemove));
        }

        case actionTypes.TOGGLE_OFFERED_PERIOD: {
            const { index } = action;

            return [
                ...state.slice(0, index),
                {
                    ...state[index],
                    selected: !state[index].selected,
                },
                ...state.slice(index + 1, state.length)
            ];
        }

        default:
            return state;
    }
};
