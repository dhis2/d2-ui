import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '../Select';
import { periodTypes } from '../../__fixtures__';

describe('<Select/>', () => {
    const defaultProps = {
        name: 'test',
        label: 'This is a test',
        value: 'Daily',
        onChange: jest.fn(),
        options: periodTypes,
        classes: {
            formControl: 'formControl',
        },
    };
    it('Matches the snapshot for regular fields', () => {
        const wrapper = shallow(<Select {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('Matches the snapshot for the year field', () => {
        const props = { ...defaultProps, name: 'year' };
        const wrapper = shallow(<Select {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
