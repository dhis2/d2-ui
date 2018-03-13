import actionTypes from './actionTypes';

export const setPeriodType = periodType => ({
        type: actionTypes.SET_PERIOD_TYPE,
        payload: periodType,
});

export const addSelectedPeriod = period => ({
    type: actionTypes.ADD_SELECTED_PERIOD,
    payload: period,
});

export const removeSelectedPeriod = id => ({
    type: actionTypes.REMOVE_SELECTED_PERIOD,
    payload: id,
});
