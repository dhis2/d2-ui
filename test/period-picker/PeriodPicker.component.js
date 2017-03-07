import React from 'react';
import { shallow } from 'enzyme';
import PeriodPicker from '../../src/period-picker/PeriodPicker.component';

describe('PeriodPicker component', () => {
    const renderPeriodPicker = ({ periodType, onPickPeriod }) => shallow(
        <PeriodPicker
            periodType={periodType}
            onPickPeriod={onPickPeriod}
        />, { context: { d2: { i18n: { getTranslation(v) { return v; } } } } });

    describe('Daily', () => {
        it('should emit the correct value when a date is picked', () => {
            const onPeriodPicked = sinon.spy();
            const dailyPeriodPicker = renderPeriodPicker({ periodType: 'Daily', onPickPeriod: onPeriodPicked });

            dailyPeriodPicker.find('DatePicker').simulate('change', {}, new Date(1488804475306));

            expect(onPeriodPicked).to.be.calledWith('20170306');
        });
    });

    describe('Monthly', () => {
        it('should emit the correct value when a date is picked', () => {
            const onPeriodPicked = sinon.spy();
            const dailyPeriodPicker = renderPeriodPicker({ periodType: 'Monthly', onPickPeriod: onPeriodPicked });

            dailyPeriodPicker.find('SelectField').at(0).simulate('change', {}/* event */, 1/* index */, '2017');
            dailyPeriodPicker.find('SelectField').at(1).simulate('change', {}/* event */, 1/* index */, '03');

            expect(onPeriodPicked).to.be.calledWith('201703');
        });
    });

    describe('Weekly', () => {
        it('should emit the correct value when a date is picked', () => {
            const onPeriodPicked = sinon.spy();
            const dailyPeriodPicker = renderPeriodPicker({ periodType: 'Weekly', onPickPeriod: onPeriodPicked });

            dailyPeriodPicker.find('SelectField').at(0).simulate('change', {}/* event */, 1/* index */, '2017');
            dailyPeriodPicker.find('SelectField').at(1).simulate('change', {}/* event */, 1/* index */, '52');

            expect(onPeriodPicked).to.be.calledWith('2017W52');
        });

        it('should not emit a value when an invalid week is picked', () => {
            const onPeriodPicked = sinon.spy();
            const dailyPeriodPicker = renderPeriodPicker({ periodType: 'Weekly', onPickPeriod: onPeriodPicked });

            dailyPeriodPicker.find('SelectField').at(0).simulate('change', {}/* event */, 1/* index */, '2017');
            dailyPeriodPicker.find('SelectField').at(1).simulate('change', {}/* event */, 1/* index */, '53');

            expect(onPeriodPicked).to.not.be.called;
        });
    });
});
