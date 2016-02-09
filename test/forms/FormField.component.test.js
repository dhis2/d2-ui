import React from 'react/addons';
import FormField from '../../src/forms/FormField.component';
import TextField from 'material-ui/lib/text-field';
import {shallow} from 'enzyme';

describe('FormField component', () => {
    let formFieldComponent;
    let fieldConfig;

    function renderComponent(props) {
        return shallow(<FormField {...props} />);
    }

    beforeEach(() => {
        fieldConfig = {
            name: 'keyEmailPort',
            type: TextField,
            fieldOptions: {
                floatingLabelText: 'keyEmailPort',
            },
        };

        formFieldComponent = renderComponent({...fieldConfig});
    });

    it('should have the component name as a class', () => {
        expect(formFieldComponent.hasClass('form-field')).to.be.true;
    });

    it('should render the material ui component', () => {
        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent).to.have.length(1);
    });

    it('should pass the fieldOptions as props to the type component', () => {
        fieldConfig.fieldOptions = {
            multiLine: true,
        };

        formFieldComponent = renderComponent({...fieldConfig});

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent.props().multiLine).to.be.true;
    });

    it('should correctly render the value', () => {
        formFieldComponent =
        formFieldComponent = renderComponent({...fieldConfig, value: 'Mark', onChange: spy()});
        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        expect(renderedMaterialUIComponent.props().defaultValue).to.equal('Mark');
    });

    it('should call the onChange when the value was changed', () => {
        const onChangeSpy = spy();

        formFieldComponent = renderComponent({
            ...fieldConfig,
            value: 'Mark',
            updateFn: onChangeSpy,
        });

        const renderedMaterialUIComponent = formFieldComponent.find(TextField);

        renderedMaterialUIComponent.simulate('change');

        expect(onChangeSpy).to.be.called;
    });

    describe('templateOptions', () => {
        it('should pass template options as props to the `type` component', () => {
            const renderedMaterialUIComponent = formFieldComponent.find(TextField);

            expect(renderedMaterialUIComponent.props().floatingLabelText).to.equal('keyEmailPort');
        });
    });
});
