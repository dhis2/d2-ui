import i18n from '@dhis2/d2-i18n';
import {
    DAY,
    WEEK,
    BI_WEEK,
    MONTH,
    BI_MONTH,
    QUARTER,
    SIX_MONTH,
    YEAR,
} from './distinctTypes';

export const days = {
    name: DAY,
    label: i18n.t('Day'),
    options: createSequence(31).reduce(
        (acc, val) => setProperty(acc, val, val),
        {}
    ),
};

export const weeks = {
    name: WEEK,
    label: i18n.t('Week'),
    options: createSequence(53).reduce(
        (acc, val) => setProperty(acc, val, val),
        {}
    ),
};

const biWeekPrefix = i18n.t('Bi week');
export const biWeeks = {
    name: BI_WEEK,
    label: i18n.t('Bi week'),
    options: createSequence(27).reduce(
        (acc, val) => setProperty(acc, val, `${biWeekPrefix} ${val}`),
        {}
    ),
};

export const months = {
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

export const biMonths = {
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

export const quarters = {
    name: QUARTER,
    label: i18n.t('Quarter'),
    options: { 1: 'Q1', 2: 'Q2', 3: 'Q3', 4: 'Q4' },
};

export const sixMonths = {
    name: SIX_MONTH,
    label: i18n.t('Six month period'),
    options: { 1: 'jan-jun', 2: 'jul-dec' },
};

export const sixMonthsApril = {
    name: SIX_MONTH,
    label: i18n.t('Six month period - April'),
    options: { 1: 'apr-sep', 2: 'oct-mar' },
};

export const sixMonthsNov = {
    name: SIX_MONTH,
    label: i18n.t('Six month period - November'),
    options: { 1: 'nov-apr', 2: 'may-oct' },
};

const currentYear = new Date().getFullYear();
const startYear = 2014; // why?
const yearLength = currentYear + 5 - startYear; // why again?
export const years = {
    name: YEAR,
    label: i18n.t('Year'),
    options: createSequence(yearLength, startYear).reduce(
        (acc, val) => setProperty(acc, val, val),
        {}
    ),
};

function createSequence(length, start = 1) {
    return Array.from({ length }, (v, i) => (start + i).toString());
}

function setProperty(obj, key, value) {
    obj[key] = value;
    return obj;
}
