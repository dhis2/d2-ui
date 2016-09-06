import React from 'react';
import injectTheme from '../../config/inject-theme';
import ExpressionFormula from '../../src/indicator-expression-manager/ExpressionFormula.component';
import TextField from 'material-ui/TextField/TextField';
import {shallow} from 'enzyme';

describe('ExpressionFormula component', () => {
    let expressionFormulaComponent;
    let onFormulaChangeSpy;

    function renderComponent(props = {}) {
        return shallow(<ExpressionFormula {...props} />);
    }

    beforeEach(() => {
        onFormulaChangeSpy = spy();

        expressionFormulaComponent = renderComponent({
            onFormulaChange: onFormulaChangeSpy,
            formula: '#{aaadsfdff.dddsdfsf} + #{ccadsfdff.eedsdfsf}',
        });
    });

    it('should have the component name as a class', () => {
        expect(expressionFormulaComponent.hasClass('expression-formula')).to.be.true;
    });

    it('should render a TextField', () => {
        expect(expressionFormulaComponent.find('textarea')).to.have.length(1);
    });

    it('should call the onFormulaChange prop when the formula changed', () => {
        const renderedTextField = expressionFormulaComponent.find('textarea');
        // Grab the second textarea (https://github.com/callemall/material-ui/blob/838abb4728614e184438002021bf1d539d104501/src/enhanced-textarea.jsx#L90-L104)

        renderedTextField.simulate('change', {
            target: {
                value: '#{dsfdff.sdfsf}',
            },
        });

        expect(onFormulaChangeSpy).to.be.calledWith('#{dsfdff.sdfsf}');
    });

    it('should not throw an error if no change handler has been passed', () => {
        const fakeEvent = {target: {value: '#{dsfdff.sdfsf}'}};
        expressionFormulaComponent = renderComponent({formula: '#{aaadsfdff.dddsdfsf} + #{ccadsfdff.eedsdfsf}'});

        const renderedTextField = expressionFormulaComponent.find('textarea');
        // Grab the second textarea (https://github.com/callemall/material-ui/blob/838abb4728614e184438002021bf1d539d104501/src/enhanced-textarea.jsx#L90-L104)

        expect(() => renderedTextField.simulate('change', fakeEvent)).not.to.throw();
    });

    it('should render the passed formula in the box', () => {
        const renderedTextField = expressionFormulaComponent.find('textarea');

        expect(renderedTextField.props().value).to.equal('#{aaadsfdff.dddsdfsf} + #{ccadsfdff.eedsdfsf}');
    });
});
