import React from 'react';
import { shallow, mount } from 'enzyme';
import {
    PeriodPicker,
    SHIFT_YEARS_BACK,
    SHIFT_YEARS_FORTH,
} from '../PeriodPicker';
import { DAY, WEEK, MONTH, YEAR } from '../../modules/distinctTypes';

describe('<PeriodPicker/>', () => {
    const mockedOnChange = jest.fn();
    const mockedD2 = {
        currentUser: {
            userSettings: { get: jest.fn(() => 'en') },
        },
    };
    const defaultProps = {
        d2: mockedD2,
        label: 'Test',
        value: '',
        onChange: mockedOnChange,
        classes: {
            label: 'label',
            flexContainer: 'flexContainer',
        },
    };

    const openSelect = (wrapper, selectName) => {
        return wrapper
            .find(`WithStyles(Select)[name="${selectName}"]`)
            .find('[role="button"]')
            .simulate('click');
    };

    const chooseSelectOption = (wrapper, selectName, selectValue) => {
        // This opens the Select
        openSelect(wrapper, selectName);

        // This selects an option (and returns it)
        return wrapper
            .find(`li[role="option"][data-value="${selectValue}"]`)
            .simulate('click');
    };

    beforeAll(() => {
        // surpress warnings from MUI so the output doesn't get cluttered
        console.error = jest.fn();
    });

    afterAll(() => {
        jest.restoreAllMocks();
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
        it('Will get an errorText if an invalid periodId is provided', () => {
            const props = { ...defaultProps, value: 'NotAValidPeriodId' };
            const wrapper = shallow(<PeriodPicker {...props} />);

            expect(wrapper).toHaveState('errorText', 'Invalid period format');
        });
    });

    describe('Behavior on change', () => {
        afterEach(() => {
            mockedOnChange.mockClear();
        });

        it('Will call props.onChange with a valid periodId once all fields have a value', () => {
            const wrapper = mount(<PeriodPicker {...defaultProps} />);

            chooseSelectOption(wrapper, 'periodType', 'Weekly');
            chooseSelectOption(wrapper, 'year', '2018');
            chooseSelectOption(wrapper, 'week', '10');

            expect(mockedOnChange).toHaveBeenCalledTimes(1);
            expect(mockedOnChange).toHaveBeenCalledWith('2018W10');
        });

        it('Will NOT call props.onChange if a required field is missing', () => {
            const wrapper = mount(<PeriodPicker {...defaultProps} />);

            chooseSelectOption(wrapper, 'periodType', 'Weekly');
            chooseSelectOption(wrapper, 'year', '2018');

            expect(mockedOnChange).toHaveBeenCalledTimes(0);
        });

        it('Will shift years back', () => {
            const wrapper = mount(<PeriodPicker {...defaultProps} />);

            chooseSelectOption(wrapper, 'periodType', 'Weekly');
            chooseSelectOption(wrapper, 'year', SHIFT_YEARS_BACK);

            expect(wrapper).toHaveState('yearOffset', -1);
        });

        it('Will shift years forth', () => {
            const wrapper = mount(<PeriodPicker {...defaultProps} />);

            chooseSelectOption(wrapper, 'periodType', 'Weekly');
            chooseSelectOption(wrapper, 'year', SHIFT_YEARS_FORTH);

            expect(wrapper).toHaveState('yearOffset', 1);
        });

        it('Will blur the year field after a backdrop click when year is empty', () => {
            // The onYearFieldClose method has a time-out of 0 ms
            // to wait for the stack to clear
            jest.useFakeTimers();

            const wrapper = mount(<PeriodPicker {...defaultProps} />);

            // Select a periodType so the year Select becomes visible
            chooseSelectOption(wrapper, 'periodType', 'Weekly');
            // Open the year select but don't click
            openSelect(wrapper, 'year');
            // Instead, find and click on the backdrop
            wrapper
                .find('div#menu-year')
                .childAt(0)
                .simulate('click');

            jest.runAllTimers();

            // After the Select looses focus, the activeElement shifts to the body
            expect(document.activeElement).toBeInstanceOf(HTMLBodyElement);
        });
    });
});
