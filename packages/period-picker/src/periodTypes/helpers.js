import i18n from '@dhis2/d2-i18n';
import { is53WeekISOYear } from 'd2/period/helpers';
import { DAY, WEEK, BI_WEEK, MONTH, SIX_MONTH, YEAR } from './distinctTypes';

export const neverAnError = () => '';

export const zeroPad = str => `0${str}`.substr(-2);

export const getMonthFromId = periodId =>
    parseInt(periodId.substr(4, 2)).toString();

export const getYearFromId = periodId => periodId.substr(0, 4);

export const createDayBasedPeriodFieldUpdater = (_periodId, startDate) => {
    const date = new Date(startDate);
    return {
        [DAY]: date.getDate().toString(),
        [MONTH]: (date.getMonth() + 1).toString(),
        [YEAR]: date.getFullYear().toString(),
    };
};

export const createWeekBasedPeriodFieldUpdater = periodId => ({
    [WEEK]: periodId.substring(periodId.lastIndexOf('W') + 1),
    [YEAR]: getYearFromId(periodId),
});

export const createSixMonthsBasedPeriodFieldUpdater = periodId => ({
    [SIX_MONTH]: periodId.split('S')[1],
    [YEAR]: getYearFromId(periodId),
});

export const createYearBasedPeriodFieldUpdater = periodId => ({
    [YEAR]: getYearFromId(periodId),
});

export const hasValues = (state, propKeys) =>
    propKeys.every(key => !!state[key]);

export const hasWeekBasedValues = state => hasValues(state, [WEEK, YEAR]);

export const hasSixMonthBasedValues = state =>
    hasValues(state, [SIX_MONTH, YEAR]);

export const hasYearBasedValues = state => !!state[YEAR];

export const getInvalidDayNumberError = state => {
    const [year, month, day] = asInts(state, [YEAR, MONTH, DAY]);
    const daysInMonth = new Date(year, month, 0).getDate();

    return day > daysInMonth
        ? i18n.t('Day number too high for current month')
        : '';
};

export const getInvalidWeekNumberError = state => {
    const [year, week] = asInts(state, [YEAR, WEEK]);
    return isWeekNumberTooHigh(week, year)
        ? i18n.t('Week number too high for current year')
        : '';
};

export const getInvalidBiWeekNumberError = state => {
    const [year, biWeek] = asInts(state, [YEAR, BI_WEEK]);
    const week = biWeek * 2 - 1;
    return isWeekNumberTooHigh(week, year)
        ? i18n.t('Bi-week number too high for current year')
        : '';
};

const asInts = (state, propKeys) => propKeys.map(key => parseInt(state[key]));

const isWeekNumberTooHigh = (week, year) =>
    !is53WeekISOYear(year) && week === 53;
