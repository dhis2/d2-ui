import React from 'react';
import { shallow } from 'enzyme';

import MuiTextField from 'material-ui/TextField';
import TextField from '../TextField';

describe('TextField component', () => {
    let Component;
    let onChangeSpy;
    const originalTextVal = 'The value of the text field';

    beforeEach(() => {
        onChangeSpy = jest.fn();

        Component = shallow(
            <TextField value={originalTextVal} changeEvent={onChangeSpy} />);
    });

    it('should render a TextField component', () => {
        expect(Component.type()).toBe(MuiTextField);
    });

    it('should change the local state when field content is changed', () => {
        expect(Component.state().value).toEqual(originalTextVal);

        const newTextVal = 'New text field value';
        Component.simulate('change', {}, newTextVal);

        expect(Component.state().value).toEqual(newTextVal);
    });
});
