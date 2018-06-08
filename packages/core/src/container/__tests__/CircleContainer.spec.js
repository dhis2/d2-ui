import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';
import CircleContainer from '../CircleContainer';
import { getStubContext } from '../../../../../config/inject-theme';

describe('Circle Container', () => {
    const render = () => shallow(<CircleContainer>Circle Container</CircleContainer>, {
        context: getStubContext(),
    });

    let wrapper;
    beforeEach(() => {
        wrapper = render();
    });

    it('should render a CircleContainer with a Container component', () => {
        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have props circle as true', () => {
        expect(wrapper.props().circle).toEqual(true);
    });
});
