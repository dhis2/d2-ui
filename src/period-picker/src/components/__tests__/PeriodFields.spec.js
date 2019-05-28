import React from 'react';
import { shallow } from 'enzyme';
import { PeriodFields } from '../PeriodFields';

describe('<PeriodFields/>', () => {
    it('Matches the snapshot', () => {
        const props = {
            periodType: 'Daily',
            onChange: jest.fn(),
            getValue: jest.fn(),
            classes: {
                flexContainer: 'flexContainer',
            },
        };
        const wrapper = shallow(<PeriodFields {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
