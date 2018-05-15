import actionTypes from '../actions/actionTypes';

export const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.ADD_OFFERED_PERIODS: {
            const { periodsToAdd, periodsToExclude } = action;
            const periods = [];

            periodsToAdd.map(period => {
                if (periodsToExclude.indexOf(period) === -1) {
                    periods.push({
                        ...period,
                        selected: false,
                    });
                }
            });

            return periods;
        }

        case actionTypes.REMOVE_OFFERED_PERIODS: {
            const { periodsToRemove } = action;
            const periods = [];

            state.map(period => {
                if (periodsToRemove.indexOf(period) === -1) {
                    periods.push(period);
                }
            });

            return periods;
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
