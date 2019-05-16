import {
    getYears,
    getMonths,
    createSequence,
    zeroPad,
    asInts,
    getMonthFromId,
    getYearFromId,
    checkForUnsupportedPeriodTypes,
} from '../helpers';
import { getPeriodTypesResponse } from '../../__fixtures__';
import PeriodTypes from '../PeriodTypes';

describe('periodTypes helpers', () => {
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

    describe('getMonths', () => {
        it('Produces the correct output', () => {
            expect(getMonths()).toMatchSnapshot();
        });
    });

    describe('createSequence', () => {
        it('Produces an array of strings starting at "1"', () => {
            const sequence = createSequence(10);
            expect(sequence.length).toEqual(10);
            expect(sequence[0]).toEqual('1');
            expect(sequence[9]).toEqual('10');
        });
        it('Can zeroPad the strings', () => {
            const sequence = createSequence(10, true);
            expect(sequence.length).toEqual(10);
            expect(sequence[0]).toEqual('01');
            expect(sequence[9]).toEqual('10');
        });
        it('Can start at another number', () => {
            const sequence = createSequence(10, false, 91);
            expect(sequence.length).toEqual(10);
            expect(sequence[0]).toEqual('91');
            expect(sequence[9]).toEqual('100');
        });
    });

    describe('zeroPad', () => {
        it('Returns a string', () => {
            expect(typeof zeroPad(1)).toEqual('string');
        });
        it('Adds leading zero when needed', () => {
            expect(zeroPad(1)).toEqual('01');
        });
        it('Does not add leading zero when the number > 9', () => {
            expect(zeroPad(10)).toEqual('10');
        });
    });

    describe('asInts', () => {
        it('Returns a number representation of strings', () => {
            const state = {
                year: '2011',
                month: '01',
                week: '1',
                day: '04',
            };
            const propKeys = ['year', 'month', 'week', 'day'];
            expect(asInts(state, propKeys)).toEqual([2011, 1, 1, 4]);
        });
    });
    describe('getMonthFromId', () => {
        it('Returns the correct month string', () => {
            expect(getMonthFromId('201104')).toEqual('04');
        });
    });
    describe('getYearFromId', () => {
        it('Returns the correct year string', () => {
            expect(getYearFromId('20110401')).toEqual('2011');
            expect(getYearFromId('2011WedW6')).toEqual('2011');
        });
    });
});

describe('checkForUnsupportedPeriodTypes', () => {
    const mockedWarn = jest.fn();
    const ORIGINAL_CONSOLE_WARN = console.warn;
    const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
    const unsupportedTypes = [{ name: 'Faker' }, { name: 'Another faker' }];
    const periodTypesListWithUnSupported = [
        ...getPeriodTypesResponse.periodTypes,
        ...unsupportedTypes,
    ];
    const mockedResponse = {
        periodTypes: periodTypesListWithUnSupported,
    };
    const mockedGet = jest.fn(() => Promise.resolve(mockedResponse));
    const mockedD2 = {
        Api: {
            getApi: () => ({ get: mockedGet }),
        },
    };
    const periodTypes = new PeriodTypes('en');
    const getPeriodType = periodTypes.getPeriodType.bind(periodTypes);

    beforeAll(() => {
        console.warn = mockedWarn;
    });

    beforeEach(() => {
        jest.resetModules();
        mockedWarn.mockClear();
    });

    afterAll(() => {
        console.warn = ORIGINAL_CONSOLE_WARN;
        process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    });

    describe('If NODE_ENV is "development"', () => {
        it('Will produce a console warning if unsupported types are found', () => {
            process.env.NODE_ENV = 'development';
            const message = [
                'WARNING: Unsupported period type(s) detected',
                'The PeriodPicker component needs to be updated to support the following period type(s):',
                'Faker, Another faker',
            ].join('\n');

            return checkForUnsupportedPeriodTypes(mockedD2, getPeriodType).then(
                () => {
                    expect(mockedWarn).toHaveBeenCalledTimes(1);
                    expect(mockedWarn).toHaveBeenCalledWith(message);
                }
            );
        });

        it('Will NOT produce a console warning if all types are supported', () => {
            process.env.NODE_ENV = 'development';
            mockedResponse.periodTypes = getPeriodTypesResponse.periodTypes;
            return checkForUnsupportedPeriodTypes(mockedD2, getPeriodType).then(
                () => {
                    expect(mockedWarn).toHaveBeenCalledTimes(0);
                }
            );
        });
    });

    describe('If NODE_ENV is "production"', () => {
        it('Will NOT produce a console warning, even if unsupported types are found', () => {
            process.env.NODE_ENV = 'production';
            mockedResponse.periodTypes = periodTypesListWithUnSupported;
            checkForUnsupportedPeriodTypes(periodTypesListWithUnSupported);
            return checkForUnsupportedPeriodTypes(mockedD2, getPeriodType).then(
                () => {
                    expect(mockedWarn).toHaveBeenCalledTimes(0);
                }
            );
        });
    });
});
