import actionTypes from '../actions/actionTypes';

export const initialState = {
    '2016W1': {
        id: '2016W1',
        name: 'First week of 2016'
    },
    '2016W2': {
        id: '2016W2',
        name: 'Second week of 2016'
    }
};

export const selectedPeriods = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_SELECTED_PERIOD:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case actionTypes.REMOVE_SELECTED_PERIOD:
            return {
                //
            };
        default:
            return state;
    }
};

export default selectedPeriods;
