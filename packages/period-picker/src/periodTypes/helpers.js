import i18n from '@dhis2/d2-i18n';
import { is53WeekISOYear } from 'd2/period/helpers';
import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from './distinctTypes';

/////////////////////////////////
////  PERIOD FIELD UPDATERS  ////
/////////////////////////////////

export const createDayBasedPeriodFieldUpdater = (_periodId, startDate) => {
    const date = new Date(startDate);
    return {
        [DAY]: zeroPad(date.getDate()),
        [MONTH]: zeroPad(date.getMonth() + 1),
        [YEAR]: date.getFullYear().toString(),
    };
};

export const createWeekBasedPeriodFieldUpdater = periodId => ({
    [WEEK]: periodId.substring(periodId.lastIndexOf('W') + 1),
    [YEAR]: getYearFromId(periodId),
});

export const createBiWeeklyPeriodFieldUpdater = periodId => ({
    [BI_WEEK]: periodId.split('BiW')[1],
    [YEAR]: getYearFromId(periodId),
});

export const createMonthlyPeriodFieldUpdater = periodId => ({
    [MONTH]: getMonthFromId(periodId),
    [YEAR]: getYearFromId(periodId),
});

export const createBiMonthlyPeriodFieldUpdater = periodId => ({
    [BI_MONTH]: periodId.substr(4, 2),
    [YEAR]: getYearFromId(periodId),
});

export const createQuarterlyPeriodFieldUpdater = periodId => ({
    [QUARTER]: periodId.split('Q')[1],
    [YEAR]: getYearFromId(periodId),
});

export const createSixMonthsBasedPeriodFieldUpdater = periodId => ({
    [SIX_MONTH]: periodId.split('S')[1],
    [YEAR]: getYearFromId(periodId),
});

export const createYearBasedPeriodFieldUpdater = periodId => ({
    [YEAR]: getYearFromId(periodId),
});

/////////////////////////
////  ERROR HELPERS  ////
/////////////////////////
export const errorMessages = {
    dayTooHigh: i18n.t('Day number too high for current month'),
    weekTooHigh: i18n.t('Week number too high for current year'),
    biWeekTooHigh: i18n.t('Bi-week number too high for current year'),
};
export const getInvalidDayNumberError = state => {
    const [year, month, day] = asInts(state, [YEAR, MONTH, DAY]);
    const daysInMonth = new Date(year, month, 0).getDate();

    return day > daysInMonth ? errorMessages.dayTooHigh : '';
};

export const getInvalidWeekNumberError = state => {
    const [year, week] = asInts(state, [YEAR, WEEK]);
    return isWeekNumberTooHigh(week, year) ? errorMessages.weekTooHigh : '';
};

export const getInvalidBiWeekNumberError = state => {
    const [year, biWeek] = asInts(state, [YEAR, BI_WEEK]);
    const week = biWeek * 2 - 1;
    return isWeekNumberTooHigh(week, year) ? errorMessages.biWeekTooHigh : '';
};

////////////////////
////  ASSORTED  ////
////////////////////
export const createHasRequiredValues = keys => state =>
    keys.every(key => !!state[key]);

export const createGetPeriodFields = fieldConfig => () => fieldConfig;

export const createGetPeriodId = templ => state =>
    templ
        .replace(BI_MONTH, state[BI_MONTH])
        .replace(BI_WEEK, state[BI_WEEK])
        .replace(DAY, state[DAY])
        .replace(MONTH, state[MONTH])
        .replace(QUARTER, state[QUARTER])
        .replace(SIX_MONTH, state[SIX_MONTH])
        .replace(WEEK, state[WEEK])
        .replace(YEAR, state[YEAR]);

export const neverAnError = () => '';

export const getMonthFromId = periodId => periodId.substr(4, 2);

export const getYearFromId = periodId => periodId.substr(0, 4);

export const zeroPad = str => `0${str}`.substr(-2);

const asInts = (state, propKeys) => propKeys.map(key => parseInt(state[key]));

const isWeekNumberTooHigh = (week, year) =>
    !is53WeekISOYear(year) && week === 53;
