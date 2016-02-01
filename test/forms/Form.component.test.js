import React from 'react/addons';
import Form from '../../src/forms/Form.component';
import FormField from '../../src/forms/FormField.component';
import injectTheme from '../../config/inject-theme';
import {FormFieldStatuses} from '../../src/forms/FormValidator';

const {
    renderIntoDocument,
    scryRenderedComponentsWithType,
    findRenderedDOMComponentWithTag,
    findRenderedComponentWithType,
    Simulate,
} = React.addons.TestUtils;

class TextField extends React.Component {
    render() {
        return (<input {...this.props} />);
    }
}

function getSystemSettingsFormConfig() {
    const systemSettings = {
        keyEmailPort: 587,
        keyEmailTls: true,
        keyCalendar: 'iso8601',
        SMS_CONFIG: {},
        orgUnitGroupSetAggregationLevel: 3,
        omitIndicatorsZeroNumeratorDataMart: false,
        keyScheduledPeriodTypes: [],
    };

    const fieldConfigs = [
        {
            name: 'keyEmailPort',
            type: TextField,
            fieldOptions: {
                floatingLabelText: 'keyEmailPort',
            },
        },
        {
            name: 'keyEmailTls',
            type: TextField,
        },
        {
            name: 'keyCalendar',
            type: TextField,
        },
    ];

    return {systemSettings, fieldConfigs};
}

xdescribe('Form component', () => {
    let formComponent;
    const renderComponent = (props, children) => {
        const FormWithContext = injectTheme(Form);
        const renderedComponents = renderIntoDocument(<FormWithContext {...props}>{children}</FormWithContext>);
        formComponent = findRenderedComponentWithType(renderedComponents, Form);
        return formComponent;
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should have the component name as a class', () => {
        expect(element(formComponent.getDOMNode()).hasClass('form')).to.be.true;
    });

    it('should render a single form tag', () => {
        const renderedFormTag = findRenderedDOMComponentWithTag(formComponent, 'form');

        expect(renderedFormTag).not.to.be.undefined;
    });

    describe('isValid method', () => {
        it('should exist', () => {
            expect(formComponent.isValid).to.be.instanceof(Function);
        });

        it('should return false initially', () => {
            expect(formComponent.isValid()).to.equal(true);
        });
    });

    describe('formFields', () => {
        beforeEach(() => {
            const FormWithContext = injectTheme(Form);
            const renderedComponents = renderIntoDocument(
                <FormWithContext>
                    <FormField type={TextField} />
                    <FormField type={TextField} />
                    <FormField type={TextField} />
                </FormWithContext>
            );
            formComponent = findRenderedComponentWithType(renderedComponents, Form);
        });

        it('should render the formFields', () => {
            const renderedFieldComponents = scryRenderedComponentsWithType(formComponent, FormField);

            expect(renderedFieldComponents.length).to.equal(3);
        });
    });

    describe('fieldConfig', () => {
        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            formComponent = renderComponent({source: systemSettings, fieldConfigs});
        });

        it('should have rendered the three FormFields from the fieldConfigs', () => {
            const renderedFormFieldComponents = scryRenderedComponentsWithType(formComponent, FormField);

            expect(renderedFormFieldComponents.length).to.equal(3);
        });

        it('should have rendered the three TextFields for the fieldConfigs', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);

            expect(renderedTextFieldComponents.length).to.equal(3);
        });

        it('should pass the fieldConfig to the FormField', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, FormField);

            expect(renderedTextFieldComponents[0].props.fieldOptions).to.deep.equal({floatingLabelText: 'keyEmailPort'});
        });
    });

    describe('formFieldUpdate', () => {
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            onFormFieldUpdateSpy = spy();

            formComponent = renderIntoDocument(<Form
                source={systemSettings}
                fieldConfigs={fieldConfigs}
                onFormFieldUpdate={onFormFieldUpdateSpy}
                />
            );
        });

        it('should call onFormFieldChange when the value updates', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React.findDOMNode(renderedTextFieldComponents[0]);

            spy(formComponent, 'updateRequest');
            expect(inputDOMNode.value).to.equal('587');

            inputDOMNode.value = '456';
            Simulate.change(inputDOMNode);

            expect(onFormFieldUpdateSpy).to.be.calledWith('keyEmailPort', '456');
        });
    });

    describe('updateEvent', () => {
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            onFormFieldUpdateSpy = spy();

            fieldConfigs[0].updateEvent = 'onBlur';

            formComponent = renderIntoDocument(<Form
                    source={systemSettings}
                    fieldConfigs={fieldConfigs}
                    onFormFieldUpdate={onFormFieldUpdateSpy}
                />
            );
        });

        it('should call onFormFieldUpdate on blur', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React.findDOMNode(renderedTextFieldComponents[0]);

            spy(formComponent, 'updateRequest');
            expect(inputDOMNode.value).to.equal('587');

            inputDOMNode.value = '456';
            Simulate.blur(inputDOMNode);

            expect(onFormFieldUpdateSpy).to.be.calledWith('keyEmailPort', '456');
        });

        it('should not call onFormFieldUpdate on change', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React.findDOMNode(renderedTextFieldComponents[0]);

            spy(formComponent, 'updateRequest');
            expect(inputDOMNode.value).to.equal('587');

            inputDOMNode.value = '456';
            Simulate.change(inputDOMNode);

            expect(onFormFieldUpdateSpy).to.have.callCount(0);
        });
    });

    // TODO: These are integration tests not unit tests... should mock the formValidator
    describe('validation', () => {
        let fieldConfig;

        beforeEach(() => {
            const failingValidator = stub().returns(false);
            failingValidator.message = 'field_is_required';

            fieldConfig = {
                name: 'keyEmailPort',
                type: TextField,
                fieldOptions: {
                    multiLine: true,
                },
                validators: [
                    stub().returns(true),
                    failingValidator,
                ],
            };

            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            findRenderedComponentWithType(formComponent, FormField);
        });

        it('should create a formValidator if no validator was passed', () => {
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            expect(formComponent.state.formValidator).to.not.be.undefined;
            expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).to.deep.equal({
                status: FormFieldStatuses.VALID,
                messages: [],
            });
        });

        it('should set the field status to VALIDATING when the validators are running', (done) => {
            fieldConfig.validators.push(() => new Promise(() => {}));
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            formComponent.state.formValidator.runFor('keyEmailPort');

            setTimeout(() => {
                expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).to.deep.equal({
                    status: FormFieldStatuses.VALIDATING,
                    messages: [],
                });
                done();
            }, 301);
        });

        it('should set the state to INVALID when the validators are done running', (done) => {
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            formComponent.state.formValidator.runFor('keyEmailPort');

            formComponent.state.formValidator.status.subscribe(() => {
                expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).to.deep.equal({
                    status: FormFieldStatuses.INVALID,
                    messages: ['field_is_required'],
                });
                done();
            });
        });

        it('should pass the translated error message to the field component', (done) => {
            function requiredValidator() {
                return false;
            }
            requiredValidator.message = 'field_is_required';
            fieldConfig.validators.push(requiredValidator);

            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            formComponent.state.formValidator.runFor('keyEmailPort');

            formComponent.state.formValidator.status.subscribe(() => {
                const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, FormField)[0];

                expect(renderedTextFieldComponents.props.errorMessage).to.equal('field_is_required_translated');
                done();
            });
        });

        it('should run validation for a specific field when the update request is being done', () => {
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            spy(formComponent.state.formValidator, 'runFor');

            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React.findDOMNode(renderedTextFieldComponents[0]);

            inputDOMNode.value = '456';
            Simulate.change(inputDOMNode);

            expect(formComponent.state.formValidator.runFor).to.be.calledWith('keyEmailPort', '456');
        });
    });
});
