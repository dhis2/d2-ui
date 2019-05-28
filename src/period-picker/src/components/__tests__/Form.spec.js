import React from 'react';
import { shallow } from 'enzyme';
import { periodTypes } from '../../__fixtures__';
import { Form } from '../Form';

describe('<Form/>', () => {
    const defaultProps = {
        periodTypes,
        periodType: '',
        onChange: jest.fn(),
        getFieldValue: jest.fn(),
        errorText: '',
        value: '',
        classes: {
            error: 'error',
            helper: 'helper',
        },
    };
    it('Renders the only the periodType <Select/> when periodType is empty', () => {
        const wrapper = shallow(<Form {...defaultProps} />);
        expect(wrapper.find('Fragment').children().length).toEqual(1);
        expect(wrapper.find('WithStyles(Select)').length).toEqual(1);
    });

    it('Renders <PeriodFields/> below the <Select/> when a periodType is present', () => {
        const props = { ...defaultProps, periodType: 'Daily' };
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find('Fragment').children().length).toEqual(2);
        expect(wrapper.find('WithStyles(PeriodFields)').length).toEqual(1);
    });

    it('Adds <FormHelperText/> with error message when an errorText is present', () => {
        const props = {
            ...defaultProps,
            periodType: 'Daily',
            errorText: 'Bad input',
        };
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find('Fragment').children().length).toEqual(3);
        expect(wrapper.find('.error.helper').length).toEqual(1);
    });

    it('Renders only a <FormHelperText/> with error message when periodTypes is missing (load error)', () => {
        const props = {
            ...defaultProps,
            periodTypes: null,
            errorText: 'Could not load periodTypes',
        };
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find('Fragment').children().length).toEqual(1);
        expect(wrapper.find('.error.helper').length).toEqual(1);
    });

    it('Renders a parsed period below the <Select/> and <PeriodFields/> if there is a valid value', () => {
        const props = {
            ...defaultProps,
            periodType: 'WeeklyWednesday',
            value: '2020WedW12',
        };
        const parsedValue = '2020 W12 March 18 - 24';
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find('Fragment').children().length).toEqual(3);
        expect(wrapper.find('.helper').length).toEqual(1);
        expect(wrapper.find('.helper').html()).toContain(parsedValue);
        expect(wrapper).toMatchSnapshot();
    });
});
