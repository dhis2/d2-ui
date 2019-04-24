import React from 'react';
import { shallow } from 'enzyme';
import {
    PeriodPicker,
    periodTypes,
    PERIOD_TYPES_ENDPOINT,
} from '../PeriodPicker';
import {
    getPeriodTypesResponse,
    periodTypes as mockedPeriodTypes,
} from '../../__fixtures__';
import { DAY, WEEK, MONTH, YEAR } from '../../periodTypes/distinctTypes';

describe('<PeriodPicker/>', () => {
    const createFakeEvent = (name, value) => ({ target: { name, value } });
    const mockedOnChange = jest.fn();
    const mockedGet = jest.fn(() => Promise.resolve(getPeriodTypesResponse));
    const mockedD2 = {
        Api: {
            getApi: () => ({
                get: mockedGet,
            }),
        },
    };
    const defaultProps = {
        d2: mockedD2,
        label: 'Test',
        value: '',
        onChange: mockedOnChange,
        classes: {
            label: 'label',
        },
    };

    describe('Loading periodTypes', () => {
        it('Should show a <Loader/> when periodTypes are not available yet', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            expect(wrapper.find('WithStyles(Loader)').length).toEqual(1);
        });

        it('Should fetch periodTypes on componentDidMount and transform them correctly', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper.update();
            expect(mockedGet).toHaveBeenCalledTimes(1);
            expect(mockedGet).toHaveBeenCalledWith(PERIOD_TYPES_ENDPOINT);
            expect(periodTypes).toEqual(mockedPeriodTypes);
        });

        it('Should skip fetching periodTypes on componentDidMount if they are already available', () => {
            mockedGet.mockClear();
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper.update();
            expect(mockedGet).toHaveBeenCalledTimes(0);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });
    });

    describe('Deriving state from a periodId value', () => {
        it('Can derive its state from a periodId value when this is set initially', () => {
            const props = { ...defaultProps, value: '20151231' };
            const wrapper = shallow(<PeriodPicker {...props} />);
            expect(wrapper).toHaveState({
                [YEAR]: '2015',
                [MONTH]: '12',
                [DAY]: '31',
            });
        });
        it('Can derive its state from a periodId when the value prop gets updated', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper.setProps({ value: '2017ThuW4' });
            expect(wrapper).toHaveState({
                [YEAR]: '2017',
                [WEEK]: '4',
            });
        });
    });

    describe('Behavior on change', () => {
        afterEach(() => {
            mockedOnChange.mockClear();
        });

        it('Will call props.onChange with a valid periodId once all fields have a value', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper
                .find('WithStyles(Form)')
                .simulate('change', createFakeEvent('periodType', 'Daily'))
                .simulate('change', createFakeEvent(DAY, '21'))
                .simulate('change', createFakeEvent(MONTH, '04'))
                .simulate('change', createFakeEvent(YEAR, '2015'));

            expect(mockedOnChange).toHaveBeenCalledTimes(1);
            expect(mockedOnChange).toHaveBeenCalledWith('20150421');
        });

        it('Will NOT call props.onChange if a required field is missing', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper
                .find('WithStyles(Form)')
                .simulate('change', createFakeEvent('periodType', 'Daily'))
                .simulate('change', createFakeEvent(DAY, '21'))
                .simulate('change', createFakeEvent(YEAR, '2015'));

            expect(mockedOnChange).toHaveBeenCalledTimes(0);
        });

        it('Will get an errorText if an invalid combination of period fields is found', () => {
            const wrapper = shallow(<PeriodPicker {...defaultProps} />);
            wrapper
                .find('WithStyles(Form)')
                .simulate('change', createFakeEvent('periodType', 'Daily'))
                .simulate('change', createFakeEvent(DAY, '31'))
                .simulate('change', createFakeEvent(MONTH, '02'))
                .simulate('change', createFakeEvent(YEAR, '2015'));

            expect(mockedOnChange).toHaveBeenCalledTimes(0);
            expect(wrapper).toHaveState(
                'errorText',
                'Day number too high for current month'
            );
        });
    });
});
