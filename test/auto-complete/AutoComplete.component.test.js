import React from 'react/addons';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from '../../src/auto-complete/AutoComplete.component';
import getRenderFunctionForComponent from '../../config/getRenderFunctionForComponent';
import Action from 'd2-flux/action/Action';

import {
    describeWithDOM,
    mount,
} from 'enzyme';

describeWithDOM('AutoComplete: AutoComplete component', () => {
    const renderComponent = (props = {}) => {
        const Component = getRenderFunctionForComponent(AutoComplete);

        return mount(<Component {...props} />);
    };

    it('should render a TextField', () => {
        const autoCompleteComponent = renderComponent();

        expect(autoCompleteComponent.find(TextField)).to.have.length(1);
    });

    it('should pass the props onto the textfield', () => {
        const autoCompleteComponent = renderComponent({
            name: 'MyName',
            someRandomProp: 'SomeValue',
        });
        const textFieldComponent = autoCompleteComponent.find(TextField);

        expect(textFieldComponent.props().name).to.equal('MyName');
        expect(textFieldComponent.props().someRandomProp).to.equal('SomeValue');
    });

    it('should call the loadAutoCompleteSuggestions action on change', () => {
        const actions = Action.createActionsFromNames(['loadAutoCompleteSuggestions']);
        stub(actions, 'loadAutoCompleteSuggestions');

        const autoCompleteComponent = renderComponent({actions});
        const testFieldComponent = autoCompleteComponent
            .find(TextField)
            .find('input');

        testFieldComponent.simulate('change');

        expect(actions.loadAutoCompleteSuggestions).to.be.called;
    });
});
