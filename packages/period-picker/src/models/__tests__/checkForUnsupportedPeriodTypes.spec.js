import { getPeriodTypesResponse } from '../../__fixtures__';
import checkForUnsupportedPeriodTypes from '../checkForUnsupportedPeriodTypes';

describe('checkForUnsupportedPeriodTypes', () => {
    const mockedWarn = jest.fn();
    const ORIGINAL_CONSOLE_WARN = console.warn;
    const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
    const unsupportedTypes = [{ name: 'Faker' }, { name: 'Another faker' }];
    const periodTypesListWithUnSupported = [
        ...getPeriodTypesResponse.periodTypes,
        ...unsupportedTypes,
    ];

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

            checkForUnsupportedPeriodTypes(periodTypesListWithUnSupported);

            expect(mockedWarn).toHaveBeenCalledTimes(1);
            expect(mockedWarn).toHaveBeenCalledWith(message);
        });

        it('Will NOT produce a console warning if all types are supported', () => {
            process.env.NODE_ENV = 'development';
            checkForUnsupportedPeriodTypes(getPeriodTypesResponse.periodTypes);
            expect(mockedWarn).toHaveBeenCalledTimes(0);
        });
    });

    describe('If NODE_ENV is "production"', () => {
        it('Will NOT produce a console warning, even if unsupported types are found', () => {
            process.env.NODE_ENV = 'production';
            checkForUnsupportedPeriodTypes(periodTypesListWithUnSupported);

            expect(mockedWarn).toHaveBeenCalledTimes(0);
        });
    });
});
