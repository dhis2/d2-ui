import actionTypes from '../actions/actionTypes';

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
export default (periodType = 'offered') => (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes[`ADD_${periodType.toUpperCase()}_PERIODS`]: {
        const periods = action.periods
            .map(period => ({
                ...period,
                selected: false,
            }))
            .filter(period => !state.periods.find(_period => _period.id === period.id));

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
            })),
        };
    }

    case actionTypes[`REMOVE_${periodType.toUpperCase()}_PERIODS`]: {
        const { periodsToRemove } = action;

        return {
            ...state,
            periods: state.periods.filter(period => !periodsToRemove.find(_period => _period.id === period.id)),
        };
    }

    case actionTypes[`TOGGLE_${periodType.toUpperCase()}_PERIOD`]: {
        const { index, isShiftPressed, isCtrlPressed } = action;
        
        // If control was not pressed, then only select
        // current period and unselect all others
        if (isCtrlPressed === false && isShiftPressed === false) {
            return {
                ...state,
                lastClickedIndex: index,
                periods: [
                    ...state.periods
                        .slice(0, index)
                        .map(period => ({ ...period, selected: false })),
                    {
                        ...state.periods[index],
                        selected: true,
                    },
                    ...state.periods
                        .slice(index + 1, state.periods.length)
                        .map(period => ({ ...period, selected: false })),
                ],
            };
        }

        const minIndex = (state.lastClickedIndex > index) ? index : state.lastClickedIndex;
        const maxIndex = (state.lastClickedIndex < index) ? index : state.lastClickedIndex;

        // If both shift and control were pressed and there are selected periods
        // then select every period from last selected period
        // to currently selected period
        if (isShiftPressed && state.lastClickedIndex !== null) {
            return {
                ...state,
                periods: [
                    ...state.periods.slice(0, minIndex),
                    ...state.periods.slice(minIndex, maxIndex + 1).map(period => ({
                        ...period,
                        selected: true,
                    })),
                    ...state.periods.slice(maxIndex + 1, state.periods.length),
                ],
            };
        }

        // If only control key was pressed, then just
        // select period without unselecting others
        return {
            ...state,
            lastClickedIndex: (!isShiftPressed && state.periods[index].selected === true)
                ? state.lastClickedIndex
                : index,
            periods: [
                ...state.periods.slice(0, index),
                {
                    ...state.periods[index],
                    selected: !state.periods[index].selected,
                },
                ...state.periods.slice(index + 1, state.periods.length),
            ],
        };
    }

    default:
        return state;
    }
};
