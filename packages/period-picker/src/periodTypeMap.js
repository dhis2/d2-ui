import i18n from '@dhis2/d2-i18n';
import { is53WeekISOYear } from 'd2/period/helpers';

export const DAY = 'day';
export const WEEK = 'week';
export const BI_WEEK = 'biWeek';
export const MONTH = 'month';
export const BI_MONTH = 'biMonth';
export const QUARTER = 'quarter';
export const SIX_MONTH = 'sixMonth';
export const YEAR = 'year';

const days = getDays();
const weeks = getWeeks();
const biWeeks = getBiWeeks();
const months = getMonths();
const biMonths = getBiMonths();
const quarters = getQuarters();
const years = getYears();
const sixMonths = getSixMonthly();
const sixMonthsApril = getSixMonthlyApril();
const sixMonthsNov = getSixMonthlyNov();

const weeklyOptionList = { weeks, years };
const yearlyOptionList = { years };

export const periodTypeMap = new Map([
    [
        'Daily',
        {
            label: i18n.t('Daily'),
            // YYYYMMDD
            getPeriodId: state =>
                state[YEAR] + zeroPad(state[MONTH]) + zeroPad(state[DAY]),
            hasRequiredValues: state => hasValues(state, [DAY, MONTH, YEAR]),
            getPeriodFields: () => ({ days, months, years }),
            createPeriodFieldUpdater: createDayBasedPeriodFieldUpdater,
            getError: getInvalidDayNumberError,
        },
    ],
    [
        'Weekly',
        {
            label: i18n.t('Weekly'),
            // YYYY"W"[1-53]
            getPeriodId: state => state[YEAR] + 'W' + zeroPad(state[WEEK]),
            hasRequiredValues: hasWeekBasedValues,
            getPeriodFields: () => weeklyOptionList,
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklyWednesday',
        {
            label: i18n.t('Weekly Wednesday'),
            // YYYY"WedW"[1-53]
            getPeriodId: state => state[YEAR] + 'WedW' + zeroPad(state[WEEK]),
            hasRequiredValues: hasWeekBasedValues,
            getPeriodFields: () => weeklyOptionList,
            crxeatePeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklyThursday',
        {
            label: i18n.t('Weekly Thursday'),
            // YYYY"ThuW"[1-53]
            getPeriodId: state => state[YEAR] + 'ThuW"' + zeroPad(state[WEEK]),
            hasRequiredValues: hasWeekBasedValues,
            getPeriodFields: () => weeklyOptionList,
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklySaturday',
        {
            label: i18n.t('Weekly Saturday'),
            // YYYY"SatW"[1-53]
            getPeriodId: state => state[YEAR] + 'SatW' + zeroPad(state[WEEK]),
            hasRequiredValues: hasWeekBasedValues,
            getPeriodFields: () => weeklyOptionList,
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklySunday',
        {
            label: i18n.t('Weekly Sunday'),
            // YYYY"SunW"[1-53]
            getPeriodId: state => state[YEAR] + 'SunW' + zeroPad(state[WEEK]),
            hasRequiredValues: hasWeekBasedValues,
            getPeriodFields: () => weeklyOptionList,
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'BiWeekly',
        {
            label: i18n.t('Bi weekly'),
            // YYYY"BiW"[1-27]
            getPeriodId: state => state[YEAR] + 'BiW' + zeroPad(state[BI_WEEK]),
            hasRequiredValues: state => hasValues(state, [BI_WEEK, YEAR]),
            getPeriodFields: () => ({ biWeeks, years }),
            createPeriodFieldUpdater: periodId => ({
                [BI_WEEK]: periodId.split('BiW')[1],
                [YEAR]: getYearFromId(periodId),
            }),
            getError: getInvalidBiWeekNumberError,
        },
    ],
    [
        'Monthly',
        {
            label: i18n.t('Monthly'),
            // YYYYMM
            getPeriodId: state => state[YEAR] + state[MONTH],
            hasRequiredValues: state => hasValues(state, [MONTH, YEAR]),
            getPeriodFields: () => ({ months, years }),
            createPeriodFieldUpdater: periodId => ({
                [MONTH]: getMonthFromId(periodId),
                [YEAR]: getYearFromId(periodId),
            }),
        },
    ],
    [
        'BiMonthly',
        {
            label: i18n.t('Bi-monthly'),
            // YYYY0[1-6]"B"
            getPeriodId: state => state[YEAR] + zeroPad(state[BI_MONTH]) + 'B',
            hasRequiredValues: state => hasValues(state, [BI_MONTH, YEAR]),
            getPeriodFields: () => ({ biMonths, years }),
            createPeriodFieldUpdater: periodId => ({
                [BI_MONTH]: periodId.substr(4, 2),
                [YEAR]: getYearFromId(periodId),
            }),
        },
    ],
    [
        'Quarterly',
        {
            label: i18n.t('Quarterly'),
            // YYYY"Q"[1-4]
            getPeriodId: state => state[YEAR] + 'Q' + state[QUARTER],
            hasRequiredValues: state => hasValues(state, [QUARTER, YEAR]),
            getPeriodFields: () => ({ quarters, years }),
            createPeriodFieldUpdater: periodId => ({
                [QUARTER]: periodId.split('Q')[1],
                [YEAR]: getYearFromId(periodId),
            }),
        },
    ],
    [
        'SixMonthly',
        {
            label: i18n.t('Six monthly'),
            // YYYY"S"[1/2]
            getPeriodId: state => state[YEAR] + 'S' + state[SIX_MONTH],
            hasRequiredValues: hasSixMonthBasedValues,
            getPeriodFields: () => ({ sixMonths, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
        },
    ],
    [
        'SixMonthlyApril',
        {
            label: i18n.t('Six monthly starting in April'),
            // YYYY"AprilS"[1/2]
            getPeriodId: state => state[YEAR] + 'AprilS' + state[SIX_MONTH],
            hasRequiredValues: hasSixMonthBasedValues,
            getPeriodFields: () => ({ sixMonthsApril, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
        },
    ],
    [
        'SixMonthlyNov',
        {
            label: i18n.t('Six monthly starting in November'),
            // YYYY"NovS"[1/2]
            getPeriodId: state => state[YEAR] + 'NovS' + state[SIX_MONTH],
            hasRequiredValues: hasSixMonthBasedValues,
            getPeriodFields: () => ({ sixMonthsNov, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
        },
    ],
    [
        'Yearly',
        {
            label: i18n.t('Yearly'),
            // YYYY
            getPeriodId: state => state[YEAR],
            hasRequiredValues: hasYearBasedValues,
            getPeriodFields: () => yearlyOptionList,
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
        },
    ],
    [
        'FinancialApril',
        {
            label: i18n.t('Financial year starting in April'),
            // YYYY"April"
            getPeriodId: state => state[YEAR] + 'April',
            hasRequiredValues: hasYearBasedValues,
            getPeriodFields: () => yearlyOptionList,
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
        },
    ],
    [
        'FinancialJuly',
        {
            label: i18n.t('Financial year starting in July'),
            // YYYY"July"
            getPeriodId: state => state[YEAR] + 'July',
            hasRequiredValues: hasYearBasedValues,
            getPeriodFields: () => yearlyOptionList,
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
        },
    ],
    [
        'FinancialOct',
        {
            label: i18n.t('Financial year starting in October'),
            // YYYY"Oct"
            getPeriodId: state => state[YEAR] + 'Oct',
            hasRequiredValues: hasYearBasedValues,
            getPeriodFields: () => yearlyOptionList,
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
        },
    ],
]);

const neverAnError = () => null;
periodTypeMap.forEach(periodType => {
    if (!periodType.getError) {
        periodType.getError = neverAnError;
    }
});

function getDays() {
    return {
        name: DAY,
        label: i18n.t('Day'),
        options: createSequence(31).reduce(
            (acc, val) => setProperty(acc, val, val),
            {}
        ),
    };
}

function getWeeks() {
    return {
        name: WEEK,
        label: i18n.t('Week'),
        options: createSequence(53).reduce(
            (acc, val) => setProperty(acc, val, val),
            {}
        ),
    };
}

function getBiWeeks() {
    const prefix = i18n.t('Bi week');
    return {
        name: BI_WEEK,
        label: i18n.t('Bi week'),
        options: createSequence(27).reduce(
            (acc, val) => setProperty(acc, val, `${prefix} ${val}`),
            {}
        ),
    };
}

function getMonths() {
    return {
        name: MONTH,
        label: i18n.t('Month'),
        options: {
            1: 'jan',
            2: 'feb',
            3: 'mar',
            4: 'apr',
            5: 'may',
            6: 'jun',
            7: 'jul',
            8: 'aug',
            9: 'sep',
            10: 'oct',
            11: 'nov',
            12: 'dec',
        },
    };
}

function getBiMonths() {
    return {
        name: BI_MONTH,
        label: i18n.t('Bi Month'),
        options: {
            1: 'jan-feb',
            2: 'mar-apr',
            3: 'may-jun',
            4: 'jul-aug',
            5: 'sep-oct',
            6: 'nov-dec',
        },
    };
}

function getQuarters() {
    return {
        name: QUARTER,
        label: i18n.t('Quarter'),
        options: { 1: 'Q1', 2: 'Q2', 3: 'Q3', 4: 'Q4' },
    };
}

function getSixMonthly() {
    return {
        name: SIX_MONTH,
        label: i18n.t('Six month period'),
        options: { 1: 'jan-jun', 2: 'jul-dec' },
    };
}

function getSixMonthlyApril() {
    return {
        name: SIX_MONTH,
        label: i18n.t('Six month period - April'),
        options: { 1: 'apr-sep', 2: 'oct-mar' },
    };
}

function getSixMonthlyNov() {
    return {
        name: SIX_MONTH,
        label: i18n.t('Six month period - November'),
        options: { 1: 'nov-apr', 2: 'may-oct' },
    };
}

function getYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 2014; // why?
    const length = currentYear + 5 - startYear; // why again?

    return {
        name: YEAR,
        label: i18n.t('Year'),
        options: createSequence(length, startYear).reduce(
            (acc, val) => setProperty(acc, val, val),
            {}
        ),
    };
}

function createSequence(length, start = 1) {
    return Array.from({ length }, (v, i) => (start + i).toString());
}

function setProperty(obj, key, value) {
    obj[key] = value;
    return obj;
}

function zeroPad(str) {
    return `0${str}`.substr(-2);
}

function getMonthFromId(periodId) {
    return periodId.substr(4, 2);
}

function getYearFromId(periodId) {
    return periodId.substr(0, 4);
}

function createDayBasedPeriodFieldUpdater(_periodId, startDate) {
    const date = new Date(startDate);
    return {
        [DAY]: date.getDay().toString(),
        [MONTH]: (date.getMonth() + 1).toString(),
        [YEAR]: date.getFullYear().toString(),
    };
}

function createWeekBasedPeriodFieldUpdater(periodId) {
    return {
        [WEEK]: periodId.split('W')[1],
        [YEAR]: getYearFromId(periodId),
    };
}

function createSixMonthsBasedPeriodFieldUpdater(periodId) {
    return {
        [SIX_MONTH]: periodId.split('S')[1],
        [YEAR]: getYearFromId(periodId),
    };
}

function createYearBasedPeriodFieldUpdater(periodId) {
    return {
        [YEAR]: getYearFromId(periodId),
    };
}

function hasValues(state, propKeys) {
    return propKeys.every(key => !!state[key]);
}

function hasWeekBasedValues(state) {
    return hasValues(state, [WEEK, YEAR]);
}

function hasSixMonthBasedValues(state) {
    return hasValues(state, [SIX_MONTH, YEAR]);
}

function hasYearBasedValues(state) {
    return !!state[YEAR];
}

function asInts(state, propKeys) {
    return propKeys.map(key => parseInt(state[key]));
}

function getInvalidDayNumberError(state) {
    const [year, month, day] = asInts(state, [YEAR, MONTH, DAY]);
    const daysInMonth = new Date(year, month, 0).getDate();

    if (day <= daysInMonth) {
        return null;
    }
    return i18n.t('Day number too high for current month');
}

function isWeekNumberTooHigh(week, year) {
    return !is53WeekISOYear(year) && week === 53;
}

function getInvalidWeekNumberError(state) {
    const [year, week] = asInts(state, [YEAR, WEEK]);
    if (isWeekNumberTooHigh(week, year)) {
        return i18n.t('Week number too high for current year');
    }
    return null;
}

function getInvalidBiWeekNumberError(state) {
    const [year, biWeek] = asInts(state, [YEAR, BI_WEEK]);
    const week = biWeek * 2 - 1;
    if (isWeekNumberTooHigh(week, year)) {
        return i18n.t('Bi-week number too high for current year');
    }
}
