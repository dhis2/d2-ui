import React from 'react';
import { shallow } from 'enzyme';
import MuiTextField from 'material-ui/TextField';
import { getStubContext } from '../../../config/inject-theme';
import TextField from '../TextField';

import { TextField as v1TextField } from 'material-ui-next/TextField';
import TextFieldTemp from '../TextFieldTemp';

describe('TextField', () => {
    const renderWithProps = (props) => {
        const nops = {
            onChange: () => {},
            ...props,
        };
        return shallow(<TextField {...nops} />, {
            context: getStubContext(),
        });
    };

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

    it('should render the MUITextField with the correct properties', () => {
        const props = {
            multiline: true,
            fullWidth: true,
            rows: 2,
            rowsMax: 4,
            placeholder: 'Getting warmer',
        };

        const muiField = renderWithProps(props).find(MuiTextField);

        expect(muiField.props().multiLine).toEqual(props.multiline);
        expect(muiField.props().fullWidth).toEqual(props.fullWidth);
        expect(muiField.props().hintText).toEqual(props.placeholder);
        expect(muiField.props().rows).toEqual(props.rows);
        expect(muiField.props().rowsMax).toEqual(props.rowsMax);
    });
});

describe('TextFieldTemp', () => {
    const renderWithProps = (props) => {
        // No-Ops ?
        const nops = {
            onChange: () => {},
            ...props,
        };
        return shallow(<TextFieldTemp {...nops} />, {
            context: getStubContext(),
        });
    };
    it('should render a MUI-v1 TextField component', () => {
        expect(renderWithProps({}).type()).toBe(v1TextField);
    });
    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-textfieldtemp');
    });
    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-v1-textfield' }).props().className).toMatch('d2-ui-textfieldtemp-my-v1-textfield');
    });
    it('should set label text when label is passed', () => {
        expect(renderWithProps({ label: 'My label' }).props().label).toEqual('My label');
    });
    it('should call onChange function when a field content is changed', () => {
        const onChangeSpy = jest.fn();
        
        renderWithProps({ onChange: onChangeSpy }).props().onChange({}, 'my text');
        expect(onChangeSpy).toHaveBeenCalledWith('my text');
    });

    it('should render the MUITextField with the correct properties', () => {
        const props = {
            multiline: true,
            fullWidth: true,
            rows: 2,
            rowsMax: 4,
            placeholder: 'Getting warmer',
        };

        const textField = renderWithProps(props).find(v1TextField);

        expect(textField.props().multiline).toEqual(props.multiline);
        expect(textField.props().fullWidth).toEqual(props.fullWidth);
        expect(textField.props().placeholder).toEqual(props.placeholder);
        expect(textField.props().rows).toEqual(props.rows);
        expect(textField.props().rowsMax).toEqual(props.rowsMax);
    });
});
