import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';
import FlatContainer from '../FlatContainer';
import { getStubContext } from '../../../../../config/inject-theme';

describe('FlatContainer', () => {
    const render = () => shallow(<FlatContainer>FlatContainer</FlatContainer>, {
        context: getStubContext(),
    });

    let wrapper;
    beforeEach(() => {
        wrapper = render();
    });

    it('should render a FlatContainer with a Container component', () => {
        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have props rounded as false', () => {
        expect(wrapper.props().rounded).toEqual(false);
    });
});
