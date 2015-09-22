import React from 'react/addons';
import {element} from 'd2-testutils';
import injectTheme from '../config/inject-theme';
import ExpressionFormula from '../../src/indicator-expression-manager/ExpressionFormula.component';
import TextField from 'material-ui/lib/text-field';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
    Simulate,
} = TestUtils;

describe('ExpressionFormula component', () => {
    let expressionFormulaComponent;
    let onFormulaChangeSpy;

    beforeEach(() => {
        onFormulaChangeSpy = spy();
        const ExpressionFormulaWithContext = injectTheme(ExpressionFormula);
        const renderedComponents = TestUtils.renderIntoDocument(
            <ExpressionFormulaWithContext onFormulaChange={onFormulaChangeSpy} formula={'#{aaadsfdff.dddsdfsf} + #{ccadsfdff.eedsdfsf}'} />
        );
        expressionFormulaComponent = findRenderedComponentWithType(renderedComponents, ExpressionFormula);
    });

    it('should have the component name as a class', () => {
        expect(element(expressionFormulaComponent.getDOMNode()).hasClass('expression-formula')).to.be.true;
    });

    it('should render a TextField', () => {
        expect(() => findRenderedComponentWithType(expressionFormulaComponent, TextField)).not.to.throw();
    });

    it('should render the TextField to be multiline', () => {
        const renderedTextField = findRenderedComponentWithType(expressionFormulaComponent, TextField);

        expect(renderedTextField.props.multiLine).to.be.true;
    });

    it('should render the TextField as fullWidth', () => {
        const renderedTextField = findRenderedComponentWithType(expressionFormulaComponent, TextField);

        expect(renderedTextField.props.fullWidth).to.be.true;
    });

    it('should call the onFormulaChange prop when the formula changed', () => {
        const renderedTextField = findRenderedComponentWithType(expressionFormulaComponent, TextField);
        // Grab the second textarea (https://github.com/callemall/material-ui/blob/838abb4728614e184438002021bf1d539d104501/src/enhanced-textarea.jsx#L90-L104)
        const textArea = React.findDOMNode(renderedTextField).querySelectorAll('textarea')[1];

        textArea.textContent = '#{dsfdff.sdfsf}';

        Simulate.change(textArea);

        expect(onFormulaChangeSpy).to.be.called;
    });

    it('should render the passed formula in the box', () => {
        const renderedTextField = findRenderedComponentWithType(expressionFormulaComponent, TextField);
        // Grab the second textarea (https://github.com/callemall/material-ui/blob/838abb4728614e184438002021bf1d539d104501/src/enhanced-textarea.jsx#L90-L104)
        const textArea = React.findDOMNode(renderedTextField).querySelectorAll('textarea')[1];

        expect(textArea.textContent).to.equal('#{aaadsfdff.dddsdfsf} + #{ccadsfdff.eedsdfsf}');
    });
});
