import * as actions from '../index'
import actionTypes from '../actionTypes'
import PeriodTypes from '../../PeriodTypes'

describe('actions', () => {
    it('should create an action to set period type', () => {
        const periodType = PeriodTypes.RELATIVE;

        const expectedAction = {
            type: actionTypes.SET_PERIOD_TYPE,
            payload: periodType
        };

        expect(actions.setPeriodType(periodType)).toEqual(expectedAction)
    });

    it('should create an action to add offered periods', () => {
       const expectedAction = {
           type: actionTypes.ADD_OFFERED_PERIODS,
           periods: []
       };

       expect(actions.addOfferedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to set offered periods', () => {
        const expectedAction = {
            type: actionTypes.SET_OFFERED_PERIODS,
            periods: []
        };

        expect(actions.setOfferedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to remove offered periods', () => {
        const expectedAction = {
            type: actionTypes.REMOVE_OFFERED_PERIODS,
            periodsToRemove: [],
        };

        expect(actions.removeOfferedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to toggle offered period', () => {
        const period =  {},
            index = 0,
            isShiftPressed = false;

        const expectedAction = {
            type: actionTypes.TOGGLE_OFFERED_PERIOD,
            period,
            index,
            isShiftPressed,
        };

        expect(actions.toggleOfferedPeriod(period, index, isShiftPressed)).toEqual(expectedAction);
    });

    it('should create an action to add selected periods', () => {
        const expectedAction = {
            type: actionTypes.ADD_SELECTED_PERIODS,
            periods: []
        };

        expect(actions.addSelectedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to set selected periods', () => {
        const expectedAction = {
            type: actionTypes.SET_SELECTED_PERIODS,
            periods: []
        };

        expect(actions.setSelectedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to remove selected periods', () => {
        const expectedAction = {
            type: actionTypes.REMOVE_SELECTED_PERIODS,
            periodsToRemove: [],
        };

        expect(actions.removeSelectedPeriods([])).toEqual(expectedAction);
    });

    it('should create an action to toggle selected period', () => {
        const period =  {},
            index = 0,
            isShiftPressed = false;

        const expectedAction = {
            type: actionTypes.TOGGLE_SELECTED_PERIOD,
            period,
            index,
            isShiftPressed,
        };

        expect(actions.toggleSelectedPeriod(period, index, isShiftPressed)).toEqual(expectedAction);
    });
});
