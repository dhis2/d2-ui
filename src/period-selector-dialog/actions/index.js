import actionTypes from './actionTypes';

export const setPeriodType = periodType => ({
    type: actionTypes.SET_PERIOD_TYPE,
    payload: periodType,
});

export const addOfferedPeriods = (periodsToAdd, periodsToExclude = []) => ({
    type: actionTypes.ADD_OFFERED_PERIODS,
    periodsToAdd,
    periodsToExclude,
});

export const removeOfferedPeriods = (periodsToRemove) => ({
    type: actionTypes.REMOVE_OFFERED_PERIODS,
    periodsToRemove,
});

export const toggleOfferedPeriod = (period, index) => ({
    type: actionTypes.TOGGLE_OFFERED_PERIOD,
    period,
    index,
});

export const addSelectedPeriods = (periodsToAdd) => ({
    type: actionTypes.ADD_SELECTED_PERIODS,
    periodsToAdd,
});

export const removeSelectedPeriods = (periodsToRemove) => ({
    type: actionTypes.REMOVE_SELECTED_PERIODS,
    periodsToRemove,
});

export const toggleSelectedPeriod = (period, index) => ({
    type: actionTypes.TOGGLE_SELECTED_PERIOD,
    period,
    index,
});
