import React from 'react/addons';
import injectTheme from '../../config/inject-theme';
import ExpressionOperators from '../../src/indicator-expression-manager/ExpressionOperators.component';
import FlatButton from 'material-ui/lib/flat-button';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    Simulate,
} = TestUtils;

xdescribe('ExpressionOperators component', () => {
    let expressionOperatorsComponent;
    let addOperatorCallback;

    beforeEach(() => {
        addOperatorCallback = spy();
        const ExpressionOperatorsWithContext = injectTheme(ExpressionOperators);

        const renderedComponents = TestUtils.renderIntoDocument(
            <ExpressionOperatorsWithContext operatorClicked={addOperatorCallback} />
        );
        expressionOperatorsComponent = findRenderedComponentWithType(renderedComponents, ExpressionOperators);
    });

    it('should have the component name as a class', () => {
        expect(element(expressionOperatorsComponent.getDOMNode()).hasClass('expression-operators')).to.be.true;
    });

    it('should render an IconButtons for each of the operators', () => {
        const buttons = scryRenderedComponentsWithType(expressionOperatorsComponent, FlatButton);

        expect(buttons.length).to.equal(7);
    });

    describe('operator buttons', () => {
        let buttons;

        beforeEach(() => {
            buttons = scryRenderedComponentsWithType(expressionOperatorsComponent, FlatButton);
        });

        it('should call callback with "("', () => {
            Simulate.click(React.findDOMNode(buttons[0]));

            expect(addOperatorCallback).to.be.calledWith('(');
        });

        it('should call callback with ")"', () => {
            Simulate.click(React.findDOMNode(buttons[1]));

            expect(addOperatorCallback).to.be.calledWith(')');
        });

        it('should call callback with "*"', () => {
            Simulate.click(React.findDOMNode(buttons[2]));

            expect(addOperatorCallback).to.be.calledWith(' * ');
        });

        it('should call callback with "/"', () => {
            Simulate.click(React.findDOMNode(buttons[3]));

            expect(addOperatorCallback).to.be.calledWith(' / ');
        });

        it('should call callback with "+"', () => {
            Simulate.click(React.findDOMNode(buttons[4]));

            expect(addOperatorCallback).to.be.calledWith(' + ');
        });

        it('should call callback with "-"', () => {
            Simulate.click(React.findDOMNode(buttons[5]));

            expect(addOperatorCallback).to.be.calledWith(' - ');
        });

        it('should call callback with "[days]"', () => {
            Simulate.click(React.findDOMNode(buttons[6]));

            expect(addOperatorCallback).to.be.calledWith(' [days] ');
        });
    });
});
