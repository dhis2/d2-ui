import {
    createDayBasedPeriodFieldUpdater,
    createWeekBasedPeriodFieldUpdater,
    createSixMonthsBasedPeriodFieldUpdater,
    createYearBasedPeriodFieldUpdater,
    createBiWeeklyPeriodFieldUpdater,
    createMonthlyPeriodFieldUpdater,
    createBiMonthlyPeriodFieldUpdater,
    createQuarterlyPeriodFieldUpdater,
    createHasRequiredValues,
    createGetPeriodFields,
    createGetPeriodId,
    getInvalidDayNumberError,
    getInvalidWeekNumberError,
    getInvalidBiWeekNumberError,
    neverAnError,
} from '../helpers';
import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from '../distinctTypes';

describe('periodTypes helpers', () => {
    const baseState = {
        [DAY]: '01',
        [WEEK]: '8',
        [BI_WEEK]: '3',
        [MONTH]: '08',
        [BI_MONTH]: '01',
        [QUARTER]: '3',
        [SIX_MONTH]: '1',
        [YEAR]: '2016',
    };

    describe('createHasRequiredValues', () => {
        const hasRequiredValues = createHasRequiredValues([YEAR, MONTH, DAY]);
        it('returns a function', () => {
            expect(typeof hasRequiredValues).toEqual('function');
        });
        it('when called with valid state config, returns true', () => {
            const state = {
                [YEAR]: '2016',
                [MONTH]: '04',
                [DAY]: '12',
            };
            expect(hasRequiredValues(state)).toEqual(true);
        });
        it('when called with invalid state config, returns false', () => {
            const state = {
                [BI_MONTH]: '04',
                [DAY]: '12',
            };
            expect(hasRequiredValues(state)).toEqual(false);
        });
    });

    describe('createGetPeriodFields', () => {
        const fields = { what: 'that' };
        const getPeriodFields = createGetPeriodFields(fields);
        it('returns a function', () => {
            expect(typeof getPeriodFields).toEqual('function');
        });
        it('when called it returns the object it was created with', () => {
            expect(getPeriodFields()).toEqual(fields);
        });
    });

    describe('createGetPeriodId', () => {
        const getPeriodId = createGetPeriodId('');
        it('returns a function', () => {
            expect(typeof getPeriodId).toEqual('function');
        });
        it('returns the correct periodId for all period-type templates', () => {
            const testCases = [
                { templ: `${YEAR}${MONTH}${DAY}`, periodId: '20160801' },
                { templ: `${YEAR}W${WEEK}`, periodId: '2016W8' },
                { templ: `${YEAR}WedW${WEEK}`, periodId: '2016WedW8' },
                { templ: `${YEAR}ThuW${WEEK}`, periodId: '2016ThuW8' },
                { templ: `${YEAR}SatW${WEEK}`, periodId: '2016SatW8' },
                { templ: `${YEAR}SunW${WEEK}`, periodId: '2016SunW8' },
                { templ: `${YEAR}BiW${BI_WEEK}`, periodId: '2016BiW3' },
                { templ: `${YEAR}${MONTH}`, periodId: '201608' },
                { templ: `${YEAR}${BI_MONTH}B`, periodId: '201601B' },
                { templ: `${YEAR}Q${QUARTER}`, periodId: '2016Q3' },
                { templ: `${YEAR}S${SIX_MONTH}`, periodId: '2016S1' },
                { templ: `${YEAR}AprilS${SIX_MONTH}`, periodId: '2016AprilS1' },
                { templ: `${YEAR}NovS${SIX_MONTH}`, periodId: '2016NovS1' },
                { templ: YEAR, periodId: '2016' },
                { templ: `${YEAR}April`, periodId: '2016April' },
                { templ: `${YEAR}July`, periodId: '2016July' },
                { templ: `${YEAR}Oct`, periodId: '2016Oct' },
                { templ: `${YEAR}Nov`, periodId: '2016Nov' },
            ];
            testCases.forEach(({ templ, periodId }) => {
                expect(createGetPeriodId(templ)(baseState)).toEqual(periodId);
            });
        });
    });

    describe('period field updaters', () => {
        it('createDayBasedPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [DAY]: '21',
                [MONTH]: '12',
                [YEAR]: '2016',
            };
            expect(
                createDayBasedPeriodFieldUpdater('20161221', '2016-12-21')
            ).toEqual(expected);
        });
        it('createWeekBasedPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [WEEK]: '12',
                [YEAR]: '2016',
            };
            const validNotations = [
                '2016W12',
                '2016WedW12',
                '2016ThuW12',
                '2016SatW12',
                '2016SunW12',
            ];
            validNotations.forEach(str => {
                expect(createWeekBasedPeriodFieldUpdater(str)).toEqual(
                    expected
                );
            });
        });
        it('createBiWeeklyPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [BI_WEEK]: '12',
                [YEAR]: '2016',
            };
            expect(createBiWeeklyPeriodFieldUpdater('2016BiW12')).toEqual(
                expected
            );
        });
        it('createMonthlyPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [MONTH]: '06',
                [YEAR]: '2016',
            };
            expect(createMonthlyPeriodFieldUpdater('201606')).toEqual(expected);
        });
        it('createBiMonthlyPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [BI_MONTH]: '02',
                [YEAR]: '2016',
            };
            expect(createBiMonthlyPeriodFieldUpdater('201602B')).toEqual(
                expected
            );
        });
        it('createQuarterlyPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [QUARTER]: '2',
                [YEAR]: '2016',
            };
            expect(createQuarterlyPeriodFieldUpdater('2016Q2')).toEqual(
                expected
            );
        });
        it('createSixMonthsBasedPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [SIX_MONTH]: '2',
                [YEAR]: '2016',
            };
            const validNotations = ['2016S2', '2016AprilS2', '2016NovS2'];
            validNotations.forEach(str => {
                expect(createSixMonthsBasedPeriodFieldUpdater(str)).toEqual(
                    expected
                );
            });
        });
        it('createYearBasedPeriodFieldUpdater returns the correct update object', () => {
            const expected = {
                [YEAR]: '2016',
            };
            const validNotations = [
                '2016',
                '2016April',
                '2016July',
                '2016Oct',
                '2016Nov',
            ];
            validNotations.forEach(str => {
                expect(createYearBasedPeriodFieldUpdater(str)).toEqual(
                    expected
                );
            });
        });
    });

    describe('error helpers', () => {
        it('getInvalidDayNumberError works correctly', () => {
            const invalidState = { ...baseState, [DAY]: '31', [MONTH]: '02' };
            expect(getInvalidDayNumberError(invalidState)).toBeTruthy();
            expect(getInvalidDayNumberError(baseState)).toEqual('');
        });
        it('getInvalidWeekNumberError works correctly', () => {
            const invalidState = { ...baseState, [YEAR]: '2016', [WEEK]: '53' };
            // 2015 is a 53 week ISO year
            const validState = { ...baseState, [YEAR]: '2015', [WEEK]: '53' };
            expect(getInvalidWeekNumberError(invalidState)).toBeTruthy();
            expect(getInvalidWeekNumberError(validState)).toEqual('');
            expect(getInvalidWeekNumberError(baseState)).toEqual('');
        });
        it('getInvalidBiWeekNumberError works correctly', () => {
            const invalidState = {
                ...baseState,
                [YEAR]: '2016',
                [BI_WEEK]: '27',
            };
            // 2015 is a 53 week ISO year
            const validState = {
                ...baseState,
                [YEAR]: '2015',
                [BI_WEEK]: '27',
            };
            expect(getInvalidBiWeekNumberError(invalidState)).toBeTruthy();
            expect(getInvalidBiWeekNumberError(validState)).toEqual('');
            expect(getInvalidBiWeekNumberError(baseState)).toEqual('');
        });
        it('neverAnError always returns an empty string', () => {
            expect(neverAnError({ [DAY]: '99999' })).toEqual('');
        });
    });
});
