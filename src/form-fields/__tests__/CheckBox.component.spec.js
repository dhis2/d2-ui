import React from 'react';
import { shallow } from 'enzyme';

import MuiCheckbox from 'material-ui/Checkbox';
import Checkbox from '../CheckBox.component';

describe('Checkbox component', () => {
    let Component;
    let onChangeSpy;
    const wrapperStyle = { marginTop: 20 };

    beforeEach(() => {
        onChangeSpy = jest.fn();
        Component = shallow(<Checkbox onChange={onChangeSpy} wrapperStyle={wrapperStyle} />);
    });

    it('should render a Checkbox component', () => {
        expect(Component.find(MuiCheckbox)).toHaveLength(1);
    });

    it('should call onChange function when the checkbox is clicked', () => {
        const muiCheckbox = Component.find(MuiCheckbox);

        muiCheckbox.simulate('check', {});

        expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should apply styles and override default styles to the wrapper div when a wrapperStyle prop is defined', () => {
        expect(Component.find('div').props().style.marginTop).toBe(20);
    });
});
