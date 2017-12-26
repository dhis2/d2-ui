import React from 'react';
import TextField from 'material-ui/TextField/TextField';
import { shallow } from 'enzyme';
import FormField from '../FormField.component';

describe('FormField component', () => {
    let formFieldComponent;
    let fieldConfig;

    function renderComponent(props) {
        const nops = {
            isValid: true,
            fieldOptions: {},
            updateFn: () => {},
            ...props,
        };
        return shallow(<FormField {...nops} />);
    }

    beforeEach(() => {
        fieldConfig = {
            name: 'keyEmailPort',
            type: TextField,
            fieldOptions: {
                floatingLabelText: 'keyEmailPort',
            },
        };

        formFieldComponent = renderComponent({ ...fieldConfig });
    });

    it('should have the component name as a class', () => {
        expect(formFieldComponent.hasClass('form-field')).toBe(true);
    });

    it('should render the material ui component', () => {
        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent).toHaveLength(1);
    });

    it('should pass the fieldOptions as props to the type component', () => {
        fieldConfig.fieldOptions = {
            multiLine: true,
        };

        formFieldComponent = renderComponent({ ...fieldConfig });

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent.props().multiLine).toBe(true);
    });

    it('should correctly render the value', () => {
        formFieldComponent =
        formFieldComponent = renderComponent({ ...fieldConfig, value: 'Mark', onChange: jest.fn() });
        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent.props().defaultValue).toBe('Mark');
    });

    it('should call the onChange when the value was changed', () => {
        const onChangeSpy = jest.fn();

        formFieldComponent = renderComponent({
            ...fieldConfig,
            value: 'Mark',
            updateFn: onChangeSpy,
        });

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        renderedMaterialUIComponent.simulate('change');

        expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should trigger state change on blur', () => {
        formFieldComponent = renderComponent({
            ...fieldConfig,
            value: 'Mark',
        });

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        renderedMaterialUIComponent.simulate('blur');

        expect(formFieldComponent.state().isFocused).toBe(false);
    });

    it('should trigger state change on focus', () => {
        formFieldComponent = renderComponent({
            ...fieldConfig,
            value: 'Mark',
        });

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        renderedMaterialUIComponent.simulate('focus');

        expect(formFieldComponent.state().isFocused).toBe(true);
    });


    describe('templateOptions', () => {
        it('should pass template options as props to the `type` component', () => {
            const renderedMaterialUIComponent = formFieldComponent.find(TextField);

            expect(renderedMaterialUIComponent.props().floatingLabelText).toBe('keyEmailPort');
        });
    });
});
