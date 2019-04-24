import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '../Loader';

describe('<Loader/>', () => {
    it('Matches the snapshot', () => {
        const props = { classes: { loader: 'loader' } };
        const wrapper = shallow(<Loader {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
