import React from 'react/addons';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from '../../src/auto-complete/AutoComplete.component';
import getRenderFunctionForComponent from '../config/getRenderFunctionForComponent';
import Action from 'd2-flux/action/Action';

const {
    findRenderedComponentWithType,
    Simulate,
} = React.addons.TestUtils;

const renderAutoComplete = getRenderFunctionForComponent(AutoComplete);

describe('AutoComplete: AutoComplete component', () => {
    it('should render a TextField', () => {
        const autoCompleteComponent = renderAutoComplete();

        expect(() => findRenderedComponentWithType(autoCompleteComponent, TextField)).not.to.throw();
    });

    it('should pass the props onto the textfield', () => {
        const autoCompleteComponent = renderAutoComplete({
            name: 'MyName',
            someRandomProp: 'SomeValue',
        });

        const textFieldComponent = findRenderedComponentWithType(autoCompleteComponent, TextField);

        expect(textFieldComponent.props.name).to.equal('MyName');
        expect(textFieldComponent.props.someRandomProp).to.equal('SomeValue');
    });

    it('should call the loadAutoCompleteSuggestions action on change', () => {
        const actions = Action.createActionsFromNames(['loadAutoCompleteSuggestions']);
        spy(actions, 'loadAutoCompleteSuggestions');
        actions.loadAutoCompleteSuggestions
            .subscribe((event) => console.log(event));
        const autoCompleteComponent = renderAutoComplete({actions});
        const textFieldComponent = findRenderedComponentWithType(autoCompleteComponent, TextField);

        Simulate.change(React.findDOMNode(textFieldComponent).querySelector('input'));

        expect(actions.loadAutoCompleteSuggestions).to.be.called;
    });
});
