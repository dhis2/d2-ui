import React from 'react';
import { shallow } from 'enzyme';
import MuiTextField from 'material-ui/TextField';
import { getStubContext } from '../../../config/inject-theme';
import TextField from '../TextField';

describe('TextField', () => {
    const renderWithProps = (props) => shallow(<TextField {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI TextField', () => {
        expect(renderWithProps({}).type()).toBe(MuiTextField);
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-textfield');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-textfield' }).props().className).toMatch('d2-ui-textfield-my-textfield');
    });

    it('should set floatingLabelText when label is passed', () => {
        expect(renderWithProps({ label: 'My label' }).props().floatingLabelText).toEqual('My label');
    });

    it('should call onChange function when a field content is changed', () => {
        const onChangeSpy = jest.fn();

        renderWithProps({ onChange: onChangeSpy }).props().onChange({}, 'my text');
        expect(onChangeSpy).toHaveBeenCalledWith('my text');
    });
});
