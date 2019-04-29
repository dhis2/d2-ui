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
import { zeroPad } from './helpers';

// always double digit
export const days = {
    name: DAY,
    label: i18n.t('Day'),
    options: createSequence(31).map(createOptionMapper({ zeroPad: true })),
};

// single digit
export const weeks = {
    name: WEEK,
    label: i18n.t('Week'),
    options: createSequence(53).map(createOptionMapper()),
};

// Single digit
export const biWeeks = {
    name: BI_WEEK,
    label: i18n.t('Bi week'),
    options: createSequence(27).map(
        createOptionMapper({ prefix: i18n.t('Bi week') })
    ),
};

// always double digit
export const months = {
    name: MONTH,
    label: i18n.t('Month'),
    options: [
        { value: '01', label: 'jan' },
        { value: '02', label: 'feb' },
        { value: '03', label: 'mar' },
        { value: '04', label: 'apr' },
        { value: '05', label: 'may' },
        { value: '06', label: 'jun' },
        { value: '07', label: 'jul' },
        { value: '08', label: 'aug' },
        { value: '09', label: 'sep' },
        { value: '10', label: 'oct' },
        { value: '11', label: 'nov' },
        { value: '12', label: 'dec' },
    ],
};

// always double digit
export const biMonths = {
    name: BI_MONTH,
    label: i18n.t('Bi Month'),
    options: [
        { value: '01', label: 'jan-feb' },
        { value: '02', label: 'mar-apr' },
        { value: '03', label: 'may-jun' },
        { value: '04', label: 'jul-aug' },
        { value: '05', label: 'sep-oct' },
        { value: '06', label: 'nov-dec' },
    ],
};

// single digit
export const quarters = {
    name: QUARTER,
    label: i18n.t('Quarter'),
    options: [
        { value: '1', label: 'Q1' },
        { value: '2', label: 'Q2' },
        { value: '3', label: 'Q3' },
        { value: '4', label: 'Q4' },
    ],
};

// single digit
export const sixMonths = {
    name: SIX_MONTH,
    label: i18n.t('Six month period'),
    options: [
        { value: '1', label: 'jan-jun' },
        { value: '2', label: 'jul-dec' },
    ],
};

// single digit
export const sixMonthsApril = {
    name: SIX_MONTH,
    label: i18n.t('Six month period - April'),
    options: [
        { value: '1', label: 'apr-sep' },
        { value: '2', label: 'oct-mar' },
    ],
};

// single digit
export const sixMonthsNov = {
    name: SIX_MONTH,
    label: i18n.t('Six month period - November'),
    options: [
        { value: '1', label: 'nov-apr' },
        { value: '2', label: 'may-oct' },
    ],
};

// single digit
const currentYear = new Date().getFullYear();
const startYear = 2014; // why?
const yearLength = currentYear + 5 - startYear; // why again?
export const years = {
    name: YEAR,
    label: i18n.t('Year'),
    options: createSequence(yearLength, startYear).map(createOptionMapper()),
};

export const weeklyOptionList = { weeks, years };
export const yearlyOptionList = { years };

function createSequence(length, start = 1) {
    return Array.from({ length }, (v, i) => (start + i).toString());
}

function createOptionMapper(config = {}) {
    return value => ({
        label: config.prefix ? `${config.prefix} ${value}` : value,
        value: config.zeroPad ? zeroPad(value) : value,
    });
}
