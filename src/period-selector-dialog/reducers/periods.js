import actionTypes from '../actions/actionTypes';
import { arrayHasById } from '../utils';

export const defaultState = {
    periods: [],
    lastClickedIndex: null,
};

/**
 * Reducer factory to reuse logic for both
 * offered & selected periods which is the same
 * @param periodType
 * @returns {Function}
 */
export const periods = (periodType = 'offered') => {
    return (state = defaultState, action) => {
        switch(action.type) {
            case actionTypes[`ADD_${periodType.toUpperCase()}_PERIODS`]: {
                const periods = action.periods
                    .map(period => ({
                        ...period,
                        selected: false,
                    }))
                    .filter(period => !arrayHasById(period, state.periods));

                return {
                    ...state,
                    periods: [
                        ...state.periods,
                        ...periods,
                    ],
                };
            }

            case actionTypes[`SET_${periodType.toUpperCase()}_PERIODS`]: {
                return {
                    ...state,
                    periods: action.periods.map(period => ({
                        ...period,
                        selected: false,
                    }))
                };
            }

            case actionTypes[`REMOVE_${periodType.toUpperCase()}_PERIODS`]: {
                const { periodsToRemove } = action;

                return {
                    ...state,
                    periods: state.periods.filter(period => !arrayHasById(period, periodsToRemove)),
                };
            }

            case actionTypes[`TOGGLE_${periodType.toUpperCase()}_PERIOD`]: {
                const { index, isShiftPressed } = action;
                const minIndex = (state.lastClickedIndex > index) ? index : state.lastClickedIndex;
                const maxIndex = (state.lastClickedIndex < index) ? index : state.lastClickedIndex;

                if (isShiftPressed && state.lastClickedIndex !== null) {
                    return {
                        ...state,
                        periods: [
                            ...state.periods.slice(0, minIndex),
                            ...state.periods.slice(minIndex, maxIndex + 1).map(period => ({
                                ...period,
                                selected: true,
                            })),
                            ...state.periods.slice(maxIndex + 1, state.periods.length)
                        ],
                    };
                }

                return {
                    ...state,
                    lastClickedIndex: (!isShiftPressed && state.periods[index].selected === true) ? state.lastClickedIndex : index,
                    periods: [
                        ...state.periods.slice(0, index),
                        {
                            ...state.periods[index],
                            selected: !state.periods[index].selected,
                        },
                        ...state.periods.slice(index + 1, state.periods.length)
                    ],
                };
            }

            default:
                return state;
        }
    };
};

export default periods;
