import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from '@dhis2/d2-ui-period-picker/src/models/distinctTypes';
import { parsedDays } from '@dhis2/d2-ui-period-picker/src/__fixtures__';
import {
    getDailyFields,
    getYears,
    months,
} from '@dhis2/d2-ui-period-picker/src/periodTypes/PeriodType';

describe('getYears', () => {
    const MOCK_YEAR = 2011;
    beforeAll(() => {
        jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(
            () => MOCK_YEAR
        );
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Returns the correct range of years', () => {
        const years = getYears({}).options;
        const startYear = (MOCK_YEAR - 4).toString();
        const endYear = (MOCK_YEAR + 3).toString();

        expect(years.length).toEqual(8);
        expect(years[0]).toEqual({ value: startYear, label: startYear });
        expect(years[7]).toEqual({ value: endYear, label: endYear });
    });

    it('Works with a negative offset', () => {
        const state = {
            yearOffset: -1,
        };
        const years = getYears(state).options;
        const startYear = (MOCK_YEAR - 4 - 8).toString();
        const endYear = (MOCK_YEAR + 3 - 8).toString();

        expect(years.length).toEqual(8);
        expect(years[0]).toEqual({ value: startYear, label: startYear });
        expect(years[7]).toEqual({ value: endYear, label: endYear });
    });
    it('Works with a positive offset', () => {
        const state = {
            yearOffset: 6,
        };
        const years = getYears(state).options;
        const startYear = (MOCK_YEAR - 4 + 8 * 6).toString();
        const endYear = (MOCK_YEAR + 3 + 8 * 6).toString();

        expect(years.length).toEqual(8);
        expect(years[0]).toEqual({ value: startYear, label: startYear });
        expect(years[7]).toEqual({ value: endYear, label: endYear });
    });
});

describe('getDailyFields', () => {
    it('Returns an empty days options array when year is falsy', () => {
        const state = { [MONTH]: '02' };
        expect(getDailyFields(state).days.options).toEqual([]);
    });
    it('Returns an days options empty array when month is falsy', () => {
        const state = { [YEAR]: '2019' };
        expect(getDailyFields(state).days.options).toEqual([]);
    });
    it('Returns the correct periodFields, and correctly parsed daily period objects when year and month are thruthy', () => {
        const state = {
            [YEAR]: '2019',
            [MONTH]: '02',
        };
        const expected = {
            years: getYears({}),
            months,
            days: {
                name: DAY,
                label: 'Day',
                options: parsedDays,
            },
        };
        expect(getDailyFields(state)).toEqual(expected);
    });
    it('It produces the correct number of days per month', () => {
        const year = '2019';
        const daysPerMonth = [
            ['01', 31],
            ['02', 28],
            ['03', 31],
            ['04', 30],
            ['05', 31],
            ['06', 30],
            ['07', 31],
            ['08', 31],
            ['09', 30],
            ['10', 31],
            ['11', 30],
            ['12', 31],
        ];

        daysPerMonth.forEach(([monthNumber, nrOfDays]) => {
            const state = { [YEAR]: year, [MONTH]: monthNumber };
            expect(getDailyFields(state).days.options.length).toEqual(nrOfDays);
        });
    });
    it('can handle leap years', () => {
        const state = { [YEAR]: '2020', [MONTH]: '02' };
        expect(getDailyFields(state).days.options.length).toEqual(29);
    });
});
describe('getWeeklyFields', () => {
    it('Returns an empty days options array when year is falsy', () => {
        const state = { [MONTH]: '02' };
        expect(getDailyFields(state).days.options).toEqual([]);
    });
    it('Returns an days options empty array when month is falsy', () => {
        const state = { [YEAR]: '2019' };
        expect(getDailyFields(state).days.options).toEqual([]);
    });
    it('Returns the correct periodFields, and correctly parsed daily period objects when year and month are thruthy', () => {
        const state = {
            [YEAR]: '2019',
            [MONTH]: '02',
        };
        const expected = {
            years: getYears({}),
            months,
            days: {
                name: DAY,
                label: 'Day',
                options: parsedDays,
            },
        };
        expect(getDailyFields(state)).toEqual(expected);
    });
    it('It produces the correct number of days per month', () => {
        const year = '2019';
        const daysPerMonth = [
            ['01', 31],
            ['02', 28],
            ['03', 31],
            ['04', 30],
            ['05', 31],
            ['06', 30],
            ['07', 31],
            ['08', 31],
            ['09', 30],
            ['10', 31],
            ['11', 30],
            ['12', 31],
        ];

        daysPerMonth.forEach(([monthNumber, nrOfDays]) => {
            const state = { [YEAR]: year, [MONTH]: monthNumber };
            expect(getDailyFields(state).days.options.length).toEqual(nrOfDays);
        });
    });
    it('can handle leap years', () => {
        const state = { [YEAR]: '2020', [MONTH]: '02' };
        expect(getDailyFields(state).days.options.length).toEqual(29);
    });
});
