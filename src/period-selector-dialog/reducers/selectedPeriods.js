import actionTypes from '../actions/actionTypes';

export const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_SELECTED_PERIODS: {
            return [
                ...state,
                ...action.periodsToAdd.map(period => ({
                    ...period,
                    selected: false,
                })),
            ];
        }

        case actionTypes.REMOVE_SELECTED_PERIODS: {
            return state.filter(period => {
                return action.periodsToRemove.indexOf(period) === -1;
            });
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
