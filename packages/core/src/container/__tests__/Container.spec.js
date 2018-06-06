import React from 'react';
import { shallow } from 'enzyme';
import Paper from 'material-ui/Paper';
import Container from '../Container';
import { getStubContext } from '../../../../../config/inject-theme';

describe('Container', () => {
    const render = () => shallow(<Container>Container</Container>, {
        context: getStubContext(),
    });

    let wrapper;
    beforeEach(() => {
        wrapper = render();
    });

    it('should render a Container with a Paper component', () => {
        expect(wrapper.find(Paper)).toHaveLength(1);
    });
});
