import i18n from '@dhis2/d2-i18n';
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
import {
    createDayBasedPeriodFieldUpdater,
    createSixMonthsBasedPeriodFieldUpdater,
    createWeekBasedPeriodFieldUpdater,
    createYearBasedPeriodFieldUpdater,
    getInvalidBiWeekNumberError,
    getInvalidDayNumberError,
    getInvalidWeekNumberError,
    getMonthFromId,
    getYearFromId,
    hasSixMonthBasedValues,
    hasValues,
    hasWeekBasedValues,
    hasYearBasedValues,
    neverAnError,
    zeroPad,
} from './helpers';
import {
    biMonths,
    biWeeks,
    days,
    months,
    quarters,
    sixMonths,
    sixMonthsApril,
    sixMonthsNov,
    weeks,
    years,
} from './options';

const weeklyOptionList = { weeks, years };
const yearlyOptionList = { years };

const periodTypeLookup = new Map([
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
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
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
            getPeriodId: state => state[YEAR] + zeroPad(state[MONTH]),
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
                [BI_MONTH]: parseInt(periodId.substr(4, 2)).toString(),
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

periodTypeLookup.forEach(periodType => {
    if (!periodType.getError) {
        periodType.getError = neverAnError;
    }
});

export default periodTypeLookup;
