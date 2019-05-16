import {
    PeriodType,
    DailyPeriodType,
    WeeklyPeriodType,
    BiWeeklyPeriodType,
    MonthlyPeriodType,
    BiMonthlyPeriodType,
    QuarterlyPeriodType,
    SixMonthlyPeriodType,
    YearlyPeriodType,
} from '../PeriodType';
import * as TYPES from '../distinctTypes';

describe('PeriodType module', () => {
    const state = {
        year: '2011',
    };
    describe('PeriodType base class instance', () => {
        const periodType = new PeriodType({
            type: TYPES.WEEK,
            typeLabel: 'Weekly',
            fieldLabel: 'Week',
        });
        const state = {
            year: '2011',
        };

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
        it('Calling the getFields method returns empty options if the required fields are not available', () => {
            const fields = periodType.getFields({ year: '' });
            expect(fields.weeks.options.length).toEqual(0);
        });
        it('Calling the getTypeLabel method returns the correct typeLabel', () => {
            expect(periodType.getTypeLabel()).toEqual('Weekly');
        });
        it('Calling the createPeriodOption method returns the correct periodOption', () => {
            const periodId = '2011W4';
            const value = '4';
            expect(
                periodType.createPeriodOption(periodId, value)
            ).toMatchSnapshot();
        });
        it('Calling the getFieldUpdateObject method returns the correct object', () => {
            expect(periodType.getFieldUpdateObject('2011W4')).toMatchSnapshot();
        });
    });

    describe('DailyPeriodType class instance', () => {
        const periodType = new DailyPeriodType({
            type: TYPES.DAY,
            typeLabel: 'Daily',
            fieldLabel: 'Day',
        });
        const localState = {
            ...state,
            month: '04',
        };

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(localState)).toMatchSnapshot();
        });
        it('Calling the getFieldUpdateObject method returns the correct periodOption', () => {
            expect(
                periodType.getFieldUpdateObject(null, '2011-04-21')
            ).toMatchSnapshot();
        });
    });

    describe('WeeklyPeriodType class instance', () => {
        const periodType = new WeeklyPeriodType({
            type: TYPES.WEEK,
            typeLabel: 'Weekly',
            fieldLabel: 'Week',
            infix: 'W',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
        it('Will have 53 options for 53 week years', () => {
            const fields = periodType.getFields({ year: '2015' });
            expect(fields.weeks.options.length).toEqual(53);
        });
    });

    describe('BiWeeklyPeriodType class instance', () => {
        const periodType = new BiWeeklyPeriodType({
            type: TYPES.BI_WEEK,
            typeLabel: 'Bi-Weekly',
            fieldLabel: 'Bi-Week',
            infix: 'BiW',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
        it('Will have 27 options for 53 week years', () => {
            const fields = periodType.getFields({ year: '2015' });
            expect(fields.biWeeks.options.length).toEqual(27);
        });
    });

    describe('MonthlyPeriodType class instance', () => {
        const periodType = new MonthlyPeriodType({
            type: TYPES.MONTH,
            typeLabel: 'Monthly',
            fieldLabel: 'Month',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
        it('Calling the getFieldUpdateObject method returns the correct object', () => {
            expect(periodType.getFieldUpdateObject('201104')).toMatchSnapshot();
        });
    });
    describe('BiMonthlyPeriodType class instance', () => {
        const periodType = new BiMonthlyPeriodType({
            type: TYPES.BI_MONTH,
            typeLabel: 'Bi-Monthly',
            fieldLabel: 'Bi-Month',
            suffix: 'B',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
        it('Calling the getFieldUpdateObject method returns the correct object', () => {
            expect(
                periodType.getFieldUpdateObject('2011B03')
            ).toMatchSnapshot();
        });
    });

    describe('QuarterlyPeriodType class instance', () => {
        const periodType = new QuarterlyPeriodType({
            type: TYPES.QUARTER,
            typeLabel: 'Quarterly',
            fieldLabel: 'Quarter',
            infix: 'Q',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
    });

    describe('SixMonthlyPeriodType class instance', () => {
        const periodType = new SixMonthlyPeriodType({
            type: TYPES.SIX_MONTH,
            typeLabel: 'Six Monthly',
            fieldLabel: 'Six month period',
            infix: 'S',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields(state)).toMatchSnapshot();
        });
    });

    describe('YearlyPeriodType class instance', () => {
        const periodType = new YearlyPeriodType({
            type: TYPES.Year,
            typeLabel: 'Yearly',
            fieldLabel: 'Year',
        });

        it('Calling the getFields method returns the correct fields', () => {
            expect(periodType.getFields({ year: '' })).toMatchSnapshot();
        });
        it('Calling the getFieldUpdateObject method returns the correct object', () => {
            expect(periodType.getFieldUpdateObject('2011')).toMatchSnapshot();
        });
    });
});
