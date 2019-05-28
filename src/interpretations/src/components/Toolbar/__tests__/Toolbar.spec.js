import React from 'react';
import { shallow } from 'enzyme';
import { Toolbar } from '../Toolbar';
import IconButton from '@material-ui/core/IconButton';

const props = {
    classes: {},
    text: 'input text',
    onClick: jest.fn(),
    element: <div/>
};

let shallowToolbar;

const toolbar = () => {
    if (!shallowToolbar) {
        shallowToolbar = shallow(<Toolbar {...props} />);
    }
    return shallowToolbar;
};

describe('components: Toolbar -> Toolbar component ', () => {
    beforeEach(() => {
        shallowToolbar = undefined;
    });

    it('should render 4 buttons', () => {
        expect(toolbar().find(IconButton).length).toEqual(4);
    });

});
