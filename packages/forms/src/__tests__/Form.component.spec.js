import React from 'react';
import { shallow } from 'enzyme';
import Form from '../Form.component';
import FormField from '../FormField.component';
import { FormFieldStatuses } from '../FormValidator';
import { getStubContext } from '../../../../config/inject-theme';

function TextField(props) {
    return (<input {...props} />);
}

function getSystemSettingsFormConfig() {
    const systemSettings = {
        keyEmailPort: 587,
        keyEmailTls: true,
        keyCalendar: 'iso8601',
        // SMS_CONFIG: {},
        // orgUnitGroupSetAggregationLevel: 3,
        // omitIndicatorsZeroNumeratorDataMart: false,
        // keyScheduledPeriodTypes: [],
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
            fieldOptions: {},
        },
        {
            name: 'keyCalendar',
            type: TextField,
            fieldOptions: {},
        },
    ];

    return { systemSettings, fieldConfigs };
}

describe('Form component', () => {
    let formComponent;
    const renderComponent = (props, children) => {
        const nops = {
            source: {},
            d2: getStubContext().d2,
            ...props,
        };
        return shallow(<Form {...nops}>{children}</Form>);
    };

    beforeEach(() => {
        formComponent = renderComponent();
    });

    it('should have the component name as a class', () => {
        expect(formComponent.hasClass('form')).toBe(true);
    });

    it('should render a single form tag', () => {
        expect(formComponent.getElement().type).toBe('form');
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
            const noop = () => {};
            formComponent = renderComponent({}, [
                <FormField key="a" isValid updateFn={noop} fieldOptions={{}} type={TextField} />,
                <FormField key="b" isValid updateFn={noop} fieldOptions={{}} type={TextField} />,
                <FormField key="c" isValid updateFn={noop} fieldOptions={{}} type={TextField} />,
            ]);
        });

        it('should render the formFields', () => {
            const renderedFieldComponents = formComponent.find(FormField);

            expect(renderedFieldComponents).toHaveLength(3);
        });
    });

    describe('fieldConfig', () => {
        beforeEach(() => {
            const { systemSettings, fieldConfigs } = getSystemSettingsFormConfig();

            formComponent = renderComponent({ source: systemSettings, fieldConfigs });
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

            expect(renderedTextFieldComponents.at(0).props().fieldOptions).toEqual({ floatingLabelText: 'keyEmailPort' });
        });
    });

    describe('formFieldUpdate', () => {
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            const { systemSettings, fieldConfigs } = getSystemSettingsFormConfig();

            onFormFieldUpdateSpy = jest.fn();

            formComponent = renderComponent({
                source: systemSettings,
                fieldConfigs,
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

});
