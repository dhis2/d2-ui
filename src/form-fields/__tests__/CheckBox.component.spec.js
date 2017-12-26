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
});
