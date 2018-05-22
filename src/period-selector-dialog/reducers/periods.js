import actionTypes from '../actions/actionTypes';
import { arrayHasById } from '../utils';

export const defaultState = {
    periods: [],
    lastClickedIndex: null,
};

export default (periodType) => {
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
                    periods: [
                        ...state.periods,
                        ...periods,
                    ],
                };
            }

            case actionTypes[`SET_${periodType.toUpperCase()}_PERIODS`]: {
                return {
                    periods: action.periods.map(period => ({
                        ...period,
                        selected: false,
                    }))
                };
            }

            case actionTypes[`REMOVE_${periodType.toUpperCase()}_PERIODS`]: {
                const { periodsToRemove } = action;

                return {
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
}
