import React from 'react/addons';
import FormField from '../../src/forms/FormField.component';
import injectTheme from '../../config/inject-theme';
import TextField from 'material-ui/lib/text-field';

const {
    renderIntoDocument,
    findRenderedComponentWithType,
    Simulate,
} = React.addons.TestUtils;

const renderFormFieldComponent = (fieldConfig, props = {onChange: spy()}) => {
    const FormFieldWithContext = injectTheme(FormField);
    const renderedComponents = renderIntoDocument(<FormFieldWithContext type={fieldConfig.type} fieldOptions={fieldConfig.fieldOptions} {...props} />);

    return findRenderedComponentWithType(renderedComponents, FormField);
};

xdescribe('FormField component', () => {
    let formFieldComponent;
    let fieldConfig;

    beforeEach(() => {
        fieldConfig = {
            name: 'keyEmailPort',
            type: TextField,
            fieldOptions: {
                floatingLabelText: 'keyEmailPort',
            },
        };

        formFieldComponent = renderFormFieldComponent(fieldConfig);
    });

    it('should have the component name as a class', () => {
        expect(element(formFieldComponent).hasClass('form-field')).to.be.true;
    });

    it('should render the material ui component', () => {
        const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

        expect(renderedMaterialUIComponent).not.to.be.undefined;
    });

    it('should pass the fieldOptions as props to the type component', () => {
        fieldConfig.fieldOptions = {
            multiLine: true,
        };

        formFieldComponent = renderFormFieldComponent(fieldConfig);

        const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

        expect(renderedMaterialUIComponent.props.multiLine).to.be.true;
    });

    it('should correctly render the value', () => {
        formFieldComponent = renderFormFieldComponent(fieldConfig, {value: 'Mark', onChange: spy()});
        const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

        const inputDOMNode = React
            .findDOMNode(renderedMaterialUIComponent)
            .querySelector('input');

        expect(inputDOMNode.value).to.equal('Mark');
    });

    it('should call the onChange when the value was changed', () => {
        const onChangeSpy = spy();

        formFieldComponent = renderFormFieldComponent(fieldConfig, {
            value: 'Mark',
            updateFn: onChangeSpy,
        });
        const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

        const inputDOMNode = React
            .findDOMNode(renderedMaterialUIComponent)
            .querySelector('input');

        Simulate.change(inputDOMNode);

        expect(onChangeSpy).to.be.called;
    });

    describe('templateOptions', () => {
        it('should pass template options as props to the `type` component', () => {
            const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

            expect(renderedMaterialUIComponent.props.floatingLabelText).to.equal('keyEmailPort');
        });
    });
});
