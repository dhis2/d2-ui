/* 
import * as actionTypes from './ActionTypes';

const TAB_INDEX_INITIAL_STATE = {
    currentTab: 0,
};

export function tabIndexReducer(state = TAB_INDEX_INITIAL_STATE, action) {
    switch (action.type) {
    case actionTypes.TOGGLE_TAB:
        return {
            ...state,
            currentTab: action.id,
        };
    default:
        return state;
    }
}

const TAB_CONTENT_INITIAL_STATE = {
    data: {},
    axes: {},
    checkbox: {},
};

export function tabContentReducer(state = TAB_CONTENT_INITIAL_STATE, action) {
    switch (action.type) {
    case actionTypes.UPDATE_DATA_TAB:
        return {
            ...state,
            data: {
                ...state.data,
                [action.fieldName]: action.newValue,
            },
        };
    case actionTypes.UPDATE_AXES_TAB:
        return {
            ...state,
            axes: {
                ...state.axes,
                [action.fieldName]: action.newValue,
            },
        };
    case actionTypes.UPDATE_CHECKBOX:
        return {
            ...state,
            checkbox: {
                ...state.checkbox,
                [action.fieldName]: action.newValue,
            },
        };
    default:
        return state;
    }
}
*/
