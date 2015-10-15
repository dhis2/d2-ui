import React from 'react/addons';
import {element} from 'd2-testutils';
import Form from '../../src/forms/Form.component';
import FormField from '../../src/forms/FormField.component';
import injectTheme from '../config/inject-theme';

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

describe('Form component', () => {
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
        let systemSettings;
        let fieldConfigs;

        // TODO: Functionize
        beforeEach(() => {
            systemSettings = {
                keyEmailPort: 587,
                keyEmailTls: true,
                keyCalendar: 'iso8601',
                SMS_CONFIG: {},
                orgUnitGroupSetAggregationLevel: 3,
                omitIndicatorsZeroNumeratorDataMart: false,
                keyScheduledPeriodTypes: [],
            };

            fieldConfigs = [
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

            fromComponent = renderComponent({source: systemSettings, fieldConfigs});
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
        let systemSettings;
        let fieldConfigs;
        let onFormFieldUpdateSpy;

        beforeEach(() => {
            // TODO: Functionaize
            systemSettings = {
                keyEmailPort: 587,
                keyEmailTls: true,
                keyCalendar: 'iso8601',
                SMS_CONFIG: {},
                orgUnitGroupSetAggregationLevel: 3,
                omitIndicatorsZeroNumeratorDataMart: false,
                keyScheduledPeriodTypes: [],
            };

            fieldConfigs = [
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

            onFormFieldUpdateSpy = spy();

            formComponent = renderIntoDocument(<Form
                source={systemSettings}
                fieldConfigs={fieldConfigs}
                onFormFieldUpdate={onFormFieldUpdateSpy}
                />
            );
        });

        xit('should call onFormFieldChange when the value updates', () => {
            const renderedTextFieldComponents = scryRenderedComponentsWithType(formComponent, TextField);
            const inputDOMNode = React
                .findDOMNode(renderedTextFieldComponents[0]);

            spy(formComponent, 'updateRequest');
            expect(inputDOMNode.value).to.equal('');

            inputDOMNode.value = 'Mark';
            Simulate.change(inputDOMNode);

            expect(onFormFieldUpdateSpy).to.be.called;
        });
    });

    describe('validation', () => {
        let formFieldComponent;
        let fieldConfig;

        beforeEach(() => {
            fieldConfig = {
                name: 'keyEmailPort',
                type: TextField,
                fieldOptions: {
                    multiLine: true,
                },
                validators: [
                    stub().returns(true),
                    stub().returns('This field is required'),
                ],
            };

            formComponent = renderComponent({fieldConfigs: [fieldConfig]});

            formFieldComponent = findRenderedComponentWithType(formComponent, FormField);
        });

        it('should run the validators before rendering', () => {
            expect(fieldConfig.validators[0]).to.be.called;
            expect(fieldConfig.validators[1]).to.be.called;
        });

        it('should pass the message from the second validator to the `type` component', () => {
            const renderedMaterialUIComponent = findRenderedComponentWithType(formFieldComponent, TextField);

            expect(renderedMaterialUIComponent.props.errorText).to.equal('This field is required_translated');
        });
    });
});
