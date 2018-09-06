import actionTypes from './actionTypes';

export const setPeriodType = periodType => ({
    type: actionTypes.SET_PERIOD_TYPE,
    payload: periodType,
});

export const addOfferedPeriods = periods => ({
    type: actionTypes.ADD_OFFERED_PERIODS,
    periods,
});

export const setOfferedPeriods = periods => ({
    type: actionTypes.SET_OFFERED_PERIODS,
    periods,
});

export const removeOfferedPeriods = periodsToRemove => ({
    type: actionTypes.REMOVE_OFFERED_PERIODS,
    periodsToRemove,
});

export const toggleOfferedPeriod = (period, index, isShiftPressed = false) => ({
    type: actionTypes.TOGGLE_OFFERED_PERIOD,
    period,
    index,
    isShiftPressed,
});

export const addSelectedPeriods = periods => ({
    type: actionTypes.ADD_SELECTED_PERIODS,
    periods,
});

export const setSelectedPeriods = periods => ({
    type: actionTypes.SET_SELECTED_PERIODS,
    periods,
});

export const removeSelectedPeriods = periodsToRemove => ({
    type: actionTypes.REMOVE_SELECTED_PERIODS,
    periodsToRemove,
});

export const toggleSelectedPeriod = (period, index, isShiftPressed) => ({
    type: actionTypes.TOGGLE_SELECTED_PERIOD,
    period,
    index,
    isShiftPressed,
});
