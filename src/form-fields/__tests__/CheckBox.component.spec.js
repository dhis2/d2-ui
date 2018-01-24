import React from 'react';
import { shallow } from 'enzyme';

import MuiCheckbox from 'material-ui/Checkbox';
import Checkbox from '../CheckBox.component';

describe('Checkbox component', () => {
    let Component;
    let onChangeSpy;

    beforeEach(() => {
        onChangeSpy = jest.fn();
        Component = shallow(<Checkbox onChange={onChangeSpy} />);
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
        const defaultMarginTop = Component.find('div').props().style.marginTop;
        let customMarginTop = 20;
        // Ensure the custom value is actually different from the default one
        if (defaultMarginTop === customMarginTop || `${defaultMarginTop}px` === customMarginTop) {
            customMarginTop = 40;
        }
        const wrapperStyle = { marginTop: customMarginTop };
        const ComponentWithWrapperStyle = shallow(<Checkbox onChange={onChangeSpy} wrapperStyle={wrapperStyle} />);
        expect(ComponentWithWrapperStyle.find('div').props().style.marginTop).toBe(customMarginTop);
    });
});
