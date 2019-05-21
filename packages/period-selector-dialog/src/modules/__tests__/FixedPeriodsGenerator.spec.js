import FixedPeriodsGenerator from '../FixedPeriodsGenerator';

describe('FixedPeriodsGenerator class', () => {
    const periodsGenerator = new FixedPeriodsGenerator();

    beforeAll(() => 
        // 2019-06-17
        jest.spyOn(Date, 'now').mockImplementation(() => 1560765600000)
    );

    describe('getOptions', () => {
        it('should return a list of available period ranges', () => {
            const periods = periodsGenerator.getOptions();

            expect(periods).toEqual([
                'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Quarterly', 'Six-monthly', 'Six-monthly April', 'Yearly', 'Financial year (Start November)', 'Financial year (Start October)', 'Financial year (Start July)', 'Financial year (Start April)'
            ]);
        });

    });

    describe('Daily period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Daily');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of days in 2019', () => {
                expect(periods.length).toEqual(365);
        });

        it('should return the correct object for 1 jan 2019 day', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-01-01',
                endDate: '2019-01-01',
                name: '2019-01-01',
                iso: '20190101',
                id: '20190101',
            });
        });

        it('should return the correct object for 31 dec 2019 day', () => {
            expect(periods[364]).toEqual({
                startDate: '2019-12-31',
                endDate: '2019-12-31',
                name: '2019-12-31',
                iso: '20191231',
                id: '20191231',
            });
        });
    });

    describe('Weekly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Weekly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of weeks in 2019', () => {
                expect(periods.length).toEqual(53);
        });

        it('should return the correct object for week 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2018-12-31',
                endDate: '2019-01-06',
                name: 'W1 - 2018-12-31 - 2019-01-06',
                iso: '2019W1',
                id: '2019W1',
            });
        });

        it('should return the correct object for week 53', () => {
            expect(periods[52]).toEqual({
                startDate: '2019-12-30',
                endDate: '2020-01-05',
                name: 'W53 - 2019-12-30 - 2020-01-05',
                iso: '2019W53',
                id: '2019W53',
            });
        });
    });

    describe('Bi-weekly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Bi-weekly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of bi-weeks in 2019', () => {
                expect(periods.length).toEqual(27);
        });

        it('should return the correct object for bi-week 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2018-12-31',
                endDate: '2019-01-13',
                name: 'Bi-Week 1 - 2018-12-31 - 2019-01-13',
                iso: '2019BiW1',
                id: '2019BiW1',
            });
        });

        it('should return the correct object for bi-week 27', () => {
            expect(periods[26]).toEqual({
                startDate: '2019-12-30',
                endDate: '2020-01-12',
                name: 'Bi-Week 27 - 2019-12-30 - 2020-01-12',
                iso: '2019BiW27',
                id: '2019BiW27',
            });
        });
    });

    describe('Monthly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Monthly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of months in 2019', () => {
                expect(periods.length).toEqual(12);
        });

        it('should return the correct object for month 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-01-01',
                endDate: '2019-01-31',
                name: 'January 2019',
                iso: '201901',
                id: '201901',
            });
        });

        it('should return the correct object for month 12', () => {
            expect(periods[11]).toEqual({
                startDate: '2019-12-01',
                endDate: '2019-12-31',
                name: 'December 2019',
                iso: '201912',
                id: '201912',
            });
        });
    });

    describe('Bi-Monthly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Bi-monthly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of bi-months in 2019', () => {
                expect(periods.length).toEqual(6);
        });

        it('should return the correct object for bi-month 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-01-01',
                endDate: '2019-02-28',
                name: 'January - February 2019',
                iso: '201901B',
                id: '201901B',
            });
        });

        it('should return the correct object for bi-month 3', () => {
            expect(periods[2]).toEqual({
                startDate: '2019-05-01',
                endDate: '2019-06-30',
                name: 'May - June 2019',
                iso: '201903B',
                id: '201903B',
            });
        });

        it('should return the correct object for bi-month 6', () => {
            expect(periods[5]).toEqual({
                startDate: '2019-11-01',
                endDate: '2019-12-31',
                name: 'November - December 2019',
                iso: '201906B',
                id: '201906B',
            });
        });
    });

    describe('Quarterly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Quarterly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of quarters in 2019', () => {
                expect(periods.length).toEqual(4);
        });

        it('should return the correct object for quarter 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-01-01',
                endDate: '2019-03-31',
                name: 'January - March 2019',
                iso: '2019Q1',
                id: '2019Q1',
            });
        });

        it('should return the correct object for quarter 4', () => {
            expect(periods[3]).toEqual({
                startDate: '2019-10-01',
                endDate: '2019-12-31',
                name: 'October - December 2019',
                iso: '2019Q4',
                id: '2019Q4',
            });
        });
    });

    describe('Six-monthly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Six-monthly');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of six-month periods in 2019', () => {
                expect(periods.length).toEqual(2);
        });

        it('should return the correct object for six-monthly 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-01-01',
                endDate: '2019-06-30',
                name: 'January - June 2019',
                iso: '2019S1',
                id: '2019S1',
            });
        });

        it('should return the correct object for six-monthly 2', () => {
            expect(periods[1]).toEqual({
                startDate: '2019-07-01',
                endDate: '2019-12-31',
                name: 'July - December 2019',
                iso: '2019S2',
                id: '2019S2',
            });
        });
    });

    describe('Six-monthly April period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Six-monthly April');

            periods = generator.generatePeriods({
                offset: 2019 - (new Date()).getFullYear(),
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of six-monthly April periods in 2019', () => {
                expect(periods.length).toEqual(2);
        });

        it('should return the correct object for six-monthly April 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-04-01',
                endDate: '2019-09-30',
                name: 'April - September 2019',
                iso: '2019AprilS1',
                id: '2019AprilS1',
            });
        });

        it('should return the correct object for six-monthly April 2', () => {
            expect(periods[1]).toEqual({
                startDate: '2019-10-01',
                endDate: '2020-03-31',
                name: 'October 2019 - March 2020',
                iso: '2019AprilS2',
                id: '2019AprilS2',
            });
        });
    });

    describe('Yearly period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Yearly');

            periods = generator.generatePeriods({
                offset: 10, // 2020 - 2029
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of yearly periods', () => {
                expect(periods.length).toEqual(10);
        });

        it('should return the correct object for yearly period 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2020-01-01',
                endDate: '2020-12-31',
                name: '2020',
                iso: '2020',
                id: '2020',
            });
        });

        it('should return the correct object for yearly period 10', () => {
            expect(periods[9]).toEqual({
                startDate: '2029-01-01',
                endDate: '2029-12-31',
                name: '2029',
                iso: '2029',
                id: '2029',
            });
        });
    });

    describe('Financial November period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Financial year (Start November)');

            periods = generator.generatePeriods({
                offset: 9,
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of financial November periods', () => {
                expect(periods.length).toEqual(10);
        });

        it('should return the correct object for financial November period 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-11-01',
                endDate: '2020-10-31',
                name: 'November 2019 - October 2020',
                id: '2019Nov',
            });
        });

        it('should return the correct object for financial November period 10', () => {
            expect(periods[9]).toEqual({
                startDate: '2028-11-01',
                endDate: '2029-10-31',
                name: 'November 2028 - October 2029',
                id: '2028Nov',
            });
        });
    });

    describe('Financial October period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Financial year (Start October)');

            periods = generator.generatePeriods({
                offset: 9,
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of financial October periods', () => {
                expect(periods.length).toEqual(10);
        });

        it('should return the correct object for financial October period 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-10-01',
                endDate: '2020-09-30',
                name: 'October 2019 - September 2020',
                id: '2019Oct',
            });
        });

        it('should return the correct object for financial October period 10', () => {
            expect(periods[9]).toEqual({
                startDate: '2028-10-01',
                endDate: '2029-09-30',
                name: 'October 2028 - September 2029',
                id: '2028Oct',
            });
        });
    });

    describe('Financial July period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Financial year (Start July)');

            periods = generator.generatePeriods({
                offset: 9,
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of financial July periods', () => {
                expect(periods.length).toEqual(10);
        });

        it('should return the correct object for financial July 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-07-01',
                endDate: '2020-06-30',
                name: 'July 2019 - June 2020',
                id: '2019July',
            });
        });

        it('should return the correct object for financial July period 10', () => {
            expect(periods[9]).toEqual({
                startDate: '2028-07-01',
                endDate: '2029-06-30',
                name: 'July 2028 - June 2029',
                id: '2028July',
            });
        });
    });

    describe('Financial April period generator', () => {
        let periods;

        beforeAll(() => {
            const generator = periodsGenerator.get('Financial year (Start April)');

            periods = generator.generatePeriods({
                offset: 9,
                filterFuturePeriods: false,
                reversePeriods: false,
            });
        });

        it('should return the correct number of financial April periods', () => {
                expect(periods.length).toEqual(10);
        });

        it('should return the correct object for financial April 1', () => {
            expect(periods[0]).toEqual({
                startDate: '2019-04-01',
                endDate: '2020-03-31',
                name: 'April 2019 - March 2020',
                id: '2019April',
            });
        });

        it('should return the correct object for financial April period 10', () => {
            expect(periods[9]).toEqual({
                startDate: '2028-04-01',
                endDate: '2029-03-31',
                name: 'April 2028 - March 2029',
                id: '2028April',
            });
        });
    });
});
