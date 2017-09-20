import React from 'react';
import { shallow } from 'enzyme';
import Form from '../Form.component';
import FormField from '../FormField.component';
import { FormFieldStatuses } from '../FormValidator';
import { getStubContext } from '../../../config/inject-theme';

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

describe('Form component', () => {
    let formComponent;
    const renderComponent = (props, children) => {
        return shallow(<Form {...props}>{children}</Form>, {
            context: getStubContext(),
        });
    };

    beforeEach(() => {
        formComponent = renderComponent();
    });

    it('should have the component name as a class', () => {
        expect(formComponent.hasClass('form')).toBe(true);
    });

    it('should render a single form tag', () => {
        expect(formComponent.node.type).toBe('form');
    });

    describe('isValid method', () => {
        it('should exist', () => {
            expect(formComponent.instance().isValid).toBeInstanceOf(Function);
        });

        it('should return false initially', () => {
            expect(formComponent.instance().isValid()).toBe(true);
        });
    });

    describe('formFields', () => {
        beforeEach(() => {
            formComponent = renderComponent({}, [
                <FormField type={TextField} />,
                <FormField type={TextField} />,
                <FormField type={TextField} />,
            ])
        });

        it('should render the formFields', () => {
            const renderedFieldComponents = formComponent.find(FormField);

            expect(renderedFieldComponents).toHaveLength(3);
        });
    });

    describe('fieldConfig', () => {
        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            formComponent = renderComponent({source: systemSettings, fieldConfigs});
        });

        it('should have rendered the three FormFields from the fieldConfigs', () => {
            const renderedFormFieldComponents = formComponent.find(FormField);

            expect(renderedFormFieldComponents).toHaveLength(3);
        });

        it('should have rendered the three TextFields for the fieldConfigs', () => {
            const renderedTextFieldComponents = formComponent.find(FormField);

            expect(renderedTextFieldComponents.at(0).props().type).toBe(TextField);
            expect(renderedTextFieldComponents.at(1).props().type).toBe(TextField);
            expect(renderedTextFieldComponents.at(2).props().type).toBe(TextField);
        });

        it('should pass the fieldConfig to the FormField', () => {
            const renderedTextFieldComponents = formComponent.find(FormField);

            expect(renderedTextFieldComponents.at(0).props().fieldOptions).toEqual({floatingLabelText: 'keyEmailPort'});
        });
    });

    describe('formFieldUpdate', () => {
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            onFormFieldUpdateSpy = jest.fn();

            formComponent = renderComponent({
                source: systemSettings,
                fieldConfigs: fieldConfigs,
                onFormFieldUpdate: onFormFieldUpdateSpy,
            });
        });

        it('should call onFormFieldChange when the value updates', () => {
            const renderedTextFieldComponent = formComponent.find(FormField).first();

            jest.spyOn(formComponent.instance(), 'updateRequest');
            expect(renderedTextFieldComponent.props().value).toBe(587);

            renderedTextFieldComponent.simulate('change', {
                target: {
                    value: '456',
                },
            });

            expect(onFormFieldUpdateSpy).toHaveBeenCalledWith('keyEmailPort', '456');

            formComponent.instance().updateRequest.mockRestore();
        });
    });

    // TODO: The onChange/onBlur can not be tested on the form component itself as the actual components are not being rendered. This functionality should be tested in the FormField component
    xdescribe('updateEvent', () => {
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            const {systemSettings, fieldConfigs} = getSystemSettingsFormConfig();

            onFormFieldUpdateSpy = jest.fn();

            fieldConfigs[0].updateEvent = 'onBlur';

            formComponent = renderComponent({
                source: systemSettings,
                fieldConfigs: fieldConfigs,
                onFormFieldUpdate: onFormFieldUpdateSpy,
            });
        });

        it('should call onFormFieldUpdate on blur', () => {
            const renderedTextFieldComponent = formComponent.find(FormField).first();

            jest.spyOn(formComponent.instance(), 'updateRequest');
            expect(renderedTextFieldComponent.props().value).toBe(587);

            renderedTextFieldComponent.simulate('blur', {
                target: {
                    value: '456',
                },
            });

            expect(onFormFieldUpdateSpy).toHaveBeenCalledWith('keyEmailPort', '456');

            formComponent.instance().updateRequest.restore();
        });

        it('should not call onFormFieldUpdate on change', () => {
            const renderedTextFieldComponent = formComponent.find(FormField).first();

            jest.spyOn(formComponent.instance(), 'updateRequest');
            expect(renderedTextFieldComponent.props().value).toBe(587);

            renderedTextFieldComponent.simulate('change', {
                target: {
                    value: '456',
                },
            });

            expect(onFormFieldUpdateSpy).to.have.callCount(0);
        });
    });

    // TODO: These are integration tests not unit tests... should mock the formValidator
    // TODO: Possible rework of the validators might need readjustment of these tests
    xdescribe('validation', () => {
        let fieldConfig;

        beforeEach(() => {
            const failingValidator = jest.fn().mockReturnValue(false);
            failingValidator.message = 'field_is_required';

            fieldConfig = {
                name: 'keyEmailPort',
                type: TextField,
                fieldOptions: {
                    multiLine: true,
                },
                validators: [
                    jest.fn().mockReturnValue(true),
                    failingValidator,
                ],
            };

            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            findRenderedComponentWithType(formComponent, FormField);
        });

        it('should create a formValidator if no validator was passed', () => {
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            expect(formComponent.state.formValidator).not.toBe(undefined);
            expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).toEqual({
                status: FormFieldStatuses.VALID,
                messages: [],
            });
        });

        it('should set the field status to VALIDATING when the validators are running', (done) => {
            fieldConfig.validators.push(() => new Promise(() => {}));
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            formComponent.state.formValidator.runFor('keyEmailPort');

            setTimeout(() => {
                expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).toEqual({
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
                expect(formComponent.state.formValidator.getStatusFor('keyEmailPort')).toEqual({
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

                expect(renderedTextFieldComponents.props.errorMessage).toBe('field_is_required_translated');
                done();
            });
        });

        it('should run validation for a specific field when the update request is being done', () => {
            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            jest.spyOn(formComponent.state.formValidator, 'runFor');

            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React.findDOMNode(renderedTextFieldComponents[0]);

            inputDOMNode.value = '456';
            Simulate.change(inputDOMNode);

            expect(formComponent.state.formValidator.runFor).toHaveBeenCalledWith('keyEmailPort', '456');
        });
    });
});
