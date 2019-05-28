import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '../Select';
import { periodTypes } from '../../__fixtures__';

describe('<Select/>', () => {
    it('Matches the snapshot', () => {
        const props = {
            name: 'test',
            label: 'This is a test',
            value: 'Daily',
            onChange: jest.fn(),
            options: periodTypes,
            classes: {
                formControl: 'formControl',
            },
        };
        const wrapper = shallow(<Select {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
