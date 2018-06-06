import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';
import RoundContainer from '../RoundContainer';
import { getStubContext } from '../../../../../config/inject-theme';

describe('RoundContainer', () => {
    const render = () => shallow(<RoundContainer>Round Container</RoundContainer>, {
        context: getStubContext(),
    });

    let wrapper;
    beforeEach(() => {
        wrapper = render();
    });

    it('should render a FlatContainer with a Container component', () => {
        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have props rounded as true', () => {
        expect(wrapper.props().rounded).toEqual(true);
    });
});
