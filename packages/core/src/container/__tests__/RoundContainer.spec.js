import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';
import RoundedContainer from '../RoundedContainer';
import { getStubContext } from '../../../../../config/inject-theme';

describe('RoundedContainer', () => {
    const render = () => shallow(<RoundedContainer>Round Container</RoundedContainer>, {
        context: getStubContext(),
    });

    let wrapper;
    beforeEach(() => {
        wrapper = render();
    });

    it('should render a RoundedContainer with a Container component', () => {
        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have props rounded as true', () => {
        expect(wrapper.props().rounded).toEqual(true);
    });
});
