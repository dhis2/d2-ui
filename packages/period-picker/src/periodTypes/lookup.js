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
    createBiWeeklyPeriodFieldUpdater,
    createMonthlyPeriodFieldUpdater,
    createBiMonthlyPeriodFieldUpdater,
    createQuarterlyPeriodFieldUpdater,
    getInvalidBiWeekNumberError,
    getInvalidDayNumberError,
    getInvalidWeekNumberError,
    neverAnError,
    createHasRequiredValues,
    createGetPeriodFields,
    createGetPeriodId,
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
    years,
    weeklyOptionList,
    yearlyOptionList,
} from './options';

const periodTypeLookup = new Map([
    [
        'Daily',
        {
            label: i18n.t('Daily'),
            // YYYYMMDD
            getPeriodId: createGetPeriodId(`${YEAR}${MONTH}${DAY}`),
            hasRequiredValues: createHasRequiredValues([DAY, MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ days, months, years }),
            createPeriodFieldUpdater: createDayBasedPeriodFieldUpdater,
            getError: getInvalidDayNumberError,
        },
    ],
    [
        'Weekly',
        {
            label: i18n.t('Weekly'),
            // YYYY"W"[1-53]
            getPeriodId: createGetPeriodId(`${YEAR}W${WEEK}`),
            hasRequiredValues: createHasRequiredValues([WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields(weeklyOptionList),
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklyWednesday',
        {
            label: i18n.t('Weekly Wednesday'),
            // YYYY"WedW"[1-53]
            getPeriodId: createGetPeriodId(`${YEAR}WedW${WEEK}`),
            hasRequiredValues: createHasRequiredValues([WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields(weeklyOptionList),
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklyThursday',
        {
            label: i18n.t('Weekly Thursday'),
            // YYYY"ThuW"[1-53]
            getPeriodId: createGetPeriodId(`${YEAR}ThuW${WEEK}`),
            hasRequiredValues: createHasRequiredValues([WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields(weeklyOptionList),
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklySaturday',
        {
            label: i18n.t('Weekly Saturday'),
            // YYYY"SatW"[1-53]
            getPeriodId: createGetPeriodId(`${YEAR}SatW${WEEK}`),
            hasRequiredValues: createHasRequiredValues([WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields(weeklyOptionList),
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'WeeklySunday',
        {
            label: i18n.t('Weekly Sunday'),
            // YYYY"SunW"[1-53]
            getPeriodId: createGetPeriodId(`${YEAR}SunW${WEEK}`),
            hasRequiredValues: createHasRequiredValues([WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields(weeklyOptionList),
            createPeriodFieldUpdater: createWeekBasedPeriodFieldUpdater,
            getError: getInvalidWeekNumberError,
        },
    ],
    [
        'BiWeekly',
        {
            label: i18n.t('Bi weekly'),
            // YYYY"BiW"[1-27]
            getPeriodId: createGetPeriodId(`${YEAR}BiW${BI_WEEK}`),
            hasRequiredValues: createHasRequiredValues([BI_WEEK, YEAR]),
            getPeriodFields: createGetPeriodFields({ biWeeks, years }),
            createPeriodFieldUpdater: createBiWeeklyPeriodFieldUpdater,
            getError: getInvalidBiWeekNumberError,
        },
    ],
    [
        'Monthly',
        {
            label: i18n.t('Monthly'),
            // YYYYMM
            getPeriodId: createGetPeriodId(`${YEAR}${MONTH}`),
            hasRequiredValues: createHasRequiredValues([MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ months, years }),
            createPeriodFieldUpdater: createMonthlyPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'BiMonthly',
        {
            label: i18n.t('Bi-monthly'),
            // YYYY0[1-6]"B"
            getPeriodId: createGetPeriodId(`${YEAR}${BI_MONTH}B`),
            hasRequiredValues: createHasRequiredValues([BI_MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ biMonths, years }),
            createPeriodFieldUpdater: createBiMonthlyPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'Quarterly',
        {
            label: i18n.t('Quarterly'),
            // YYYY"Q"[1-4]
            getPeriodId: createGetPeriodId(`${YEAR}Q${QUARTER}`),
            hasRequiredValues: createHasRequiredValues([QUARTER, YEAR]),
            getPeriodFields: createGetPeriodFields({ quarters, years }),
            createPeriodFieldUpdater: createQuarterlyPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'SixMonthly',
        {
            label: i18n.t('Six monthly'),
            // YYYY"S"[1/2]
            getPeriodId: createGetPeriodId(`${YEAR}S${SIX_MONTH}`),
            hasRequiredValues: createHasRequiredValues([SIX_MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ sixMonths, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'SixMonthlyApril',
        {
            label: i18n.t('Six monthly starting in April'),
            // YYYY"AprilS"[1/2]
            getPeriodId: createGetPeriodId(`${YEAR}AprilS${SIX_MONTH}`),
            hasRequiredValues: createHasRequiredValues([SIX_MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ sixMonthsApril, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'SixMonthlyNov',
        {
            label: i18n.t('Six monthly starting in November'),
            // YYYY"NovS"[1/2]
            getPeriodId: createGetPeriodId(`${YEAR}NovS${SIX_MONTH}`),
            hasRequiredValues: createHasRequiredValues([SIX_MONTH, YEAR]),
            getPeriodFields: createGetPeriodFields({ sixMonthsNov, years }),
            createPeriodFieldUpdater: createSixMonthsBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'Yearly',
        {
            label: i18n.t('Yearly'),
            // YYYY
            getPeriodId: createGetPeriodId(YEAR),
            hasRequiredValues: createHasRequiredValues([YEAR]),
            getPeriodFields: createGetPeriodFields(yearlyOptionList),
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'FinancialApril',
        {
            label: i18n.t('Financial year starting in April'),
            // YYYY"April"
            getPeriodId: createGetPeriodId(`${YEAR}April`),
            hasRequiredValues: createHasRequiredValues([YEAR]),
            getPeriodFields: createGetPeriodFields(yearlyOptionList),
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'FinancialJuly',
        {
            label: i18n.t('Financial year starting in July'),
            // YYYY"July"
            getPeriodId: createGetPeriodId(`${YEAR}July`),
            hasRequiredValues: createHasRequiredValues([YEAR]),
            getPeriodFields: createGetPeriodFields(yearlyOptionList),
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'FinancialOct',
        {
            label: i18n.t('Financial year starting in October'),
            // YYYY"Oct"
            getPeriodId: createGetPeriodId(`${YEAR}Oct`),
            hasRequiredValues: createHasRequiredValues([YEAR]),
            getPeriodFields: createGetPeriodFields(yearlyOptionList),
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
    [
        'FinancialNov',
        {
            label: i18n.t('Financial year starting in November'),
            // YYYY"Oct"
            getPeriodId: createGetPeriodId(`${YEAR}Nov`),
            hasRequiredValues: createHasRequiredValues([YEAR]),
            getPeriodFields: createGetPeriodFields(yearlyOptionList),
            createPeriodFieldUpdater: createYearBasedPeriodFieldUpdater,
            getError: neverAnError,
        },
    ],
]);

export default periodTypeLookup;
