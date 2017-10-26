import React from 'react';
import { shallow } from 'enzyme';
import MuiSelectField from 'material-ui/SelectField';
import { getStubContext } from '../../../config/inject-theme';
import SelectField from '../SelectField';

describe('SelectField', () => {
    const renderWithProps = (props) => shallow(<SelectField {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI SelectField', () => {
        expect(renderWithProps({}).type()).toBe(MuiSelectField);
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-selectfield');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-selectfield' }).props().className).toMatch('d2-ui-selectfield-my-selectfield');
    });
});
