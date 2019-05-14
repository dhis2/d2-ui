import i18n from '@dhis2/d2-i18n';
import { getMonthNamesForLocale } from 'd2/period/helpers';
import {
    MONTH,
    YEAR,
} from '@dhis2/d2-ui-period-picker/src/models/distinctTypes';

export const getYears = ({ yearOffset = 0 }) => {
    const len = 8;
    const start = new Date().getFullYear() - len / 2 + yearOffset * len;
    return {
        name: YEAR,
        label: i18n.t('Year'),
        options: createSequence(len, false, start).map(year => ({
            value: year,
            label: year,
        })),
    };
};

export const getMonths = locale => {
    const monthNames = getMonthNamesForLocale(locale);
    return {
        name: MONTH,
        label: i18n.t('Month'),
        options: monthNames.map((name, index) => ({
            label: name,
            value: zeroPad(index + 1),
        })),
    };
};

export const createSequence = (length, shouldPad = false, start = 1) =>
    Array.from(
        { length },
        (v, i) => (shouldPad ? zeroPad(start + i) : (start + i).toString())
    );

export const zeroPad = str => `0${str}`.substr(-2);

export const asInts = (state, propKeys) =>
    propKeys.map(key => parseInt(state[key]));

export const getMonthFromId = periodId => periodId.substr(4, 2);

export const getYearFromId = periodId => periodId.substr(0, 4);

export const checkForUnsupportedPeriodTypes = async (d2, getPeriodType) => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const api = d2.Api.getApi();
    const response = await api.get('periodTypes');
    const unsupportedPeriodTypes = response.periodTypes
        .filter(({ name }) => !getPeriodType(name))
        .map(({ name }) => name)
        .join(', ');

    if (unsupportedPeriodTypes) {
        console.warn(
            [
                'WARNING: Unsupported period type(s) detected',
                'The PeriodPicker component needs to be updated to support the following period type(s):',
                unsupportedPeriodTypes,
            ].join('\n')
        );
    }
};
