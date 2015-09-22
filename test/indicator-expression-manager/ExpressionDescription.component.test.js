import React from 'react/addons';
import {element} from 'd2-testutils';
import injectTheme from '../config/inject-theme';
import TextField from 'material-ui/lib/text-field';
import ExpressionDescription from '../../src/indicator-expression-manager/ExpressionDescription.component';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
    Simulate,
    } = TestUtils;


describe('ExpressionDescription component', () => {
    let expressionDescriptionComponent;
    let onDescriptionChangeSpy;

    beforeEach(() => {
        onDescriptionChangeSpy = spy();
        const ExpressionDescriptionWithContext = injectTheme(ExpressionDescription);

        const renderedComponents = TestUtils.renderIntoDocument(
            <ExpressionDescriptionWithContext onDescriptionChange={onDescriptionChangeSpy} descriptionLabel="Numerator description" />
        );
        expressionDescriptionComponent = findRenderedComponentWithType(renderedComponents, ExpressionDescription);
    });

    it('should have the component name as a class', () => {
        expect(element(expressionDescriptionComponent.getDOMNode()).hasClass('expression-description')).to.be.true;
    });

    it('should render a textfield for description', () => {
        expect(() => findRenderedComponentWithType(expressionDescriptionComponent, TextField)).not.to.throw();
    });

    describe('description field', () => {
        let descriptionComponent;

        beforeEach(() => {
            descriptionComponent = findRenderedComponentWithType(expressionDescriptionComponent, TextField);
        });

        it('should have the a floatingLabelText that equals the descriptionLabel property', () => {
            expect(descriptionComponent.props.floatingLabelText).to.equal('Numerator description');
        });

        it('should set the value of the description onto the state after change', () => {
            const inputBox = React.findDOMNode(descriptionComponent).querySelector('input');
            inputBox.value = 'My indicator expression description';

            Simulate.change(inputBox);

            expect(onDescriptionChangeSpy).to.be.calledWith('My indicator expression description');
        });
    });
});
