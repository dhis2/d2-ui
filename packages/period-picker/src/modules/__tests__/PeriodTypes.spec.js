import PeriodTypes from '../PeriodTypes';

describe('PeriodTypes instance', () => {
    const periodTypes = new PeriodTypes('en');

    it('getPeriodTypes returns the correct array', () => {
        expect(periodTypes.getPeriodTypes()).toMatchSnapshot();
    });
    it('getPeriodType returns the correct period type', () => {
        expect(periodTypes.getPeriodType('Monthly')).toMatchSnapshot();
    });
    it('getFields returns the correct fields', () => {
        const state = {
            periodType: 'Daily',
            year: '2011',
            month: '02',
        };
        expect(periodTypes.getFields(state)).toMatchSnapshot();
    });
    it('getFields returns an empty object if a periodType is not available', () => {
        expect(periodTypes.getFields({ periodType: '' })).toEqual({});
    });
    it('getFieldUpdateObject returns the correct object', () => {
        const config = {
            type: 'Daily',
            id: '20110412',
            startDate: '2011-04-12',
        };
        expect(periodTypes.getFieldUpdateObject(config)).toMatchSnapshot();
    });
    describe('findActivePeriodId', () => {
        const state = {
            periodType: 'Daily',
            year: '2011',
            month: '04',
            day: '12',
        };
        it('can find an ID when one is available', () => {
            expect(periodTypes.findActivePeriodId(state, 'year')).toEqual(
                '20110412'
            );
        });
        it('will return null when the fieldKeyToSkip contains the ID', () => {
            expect(periodTypes.findActivePeriodId(state, 'days')).toEqual(null);
        });
    });
});
