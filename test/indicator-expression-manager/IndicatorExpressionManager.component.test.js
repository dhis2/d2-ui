import React from 'react/addons';
import {element} from 'd2-testutils';
import injectTheme from '../config/inject-theme';
import IndicatorExpressionManager from '../../src/indicator-expression-manager/IndicatorExpressionManager.component';
import TextField from 'material-ui/lib/text-field';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
    Simulate,
} = TestUtils;

describe('IndicatorExpressionManager component', () => {
    let indicatorExpressionManagerComponent;

    beforeEach(() => {
        const IndicatorExpressionManagerWithContext = injectTheme(IndicatorExpressionManager);

        const renderedComponents = TestUtils.renderIntoDocument(
            <IndicatorExpressionManagerWithContext
                descriptionLabel="Numerator description"
                />);
        indicatorExpressionManagerComponent = findRenderedComponentWithType(renderedComponents, IndicatorExpressionManager);
    });

    it('should have the component name as a class', () => {
        expect(element(indicatorExpressionManagerComponent.getDOMNode()).hasClass('indicator-expression-manager')).to.be.true;
    });

    it('should render a textfield for description', () => {
        expect(() => findRenderedComponentWithType(indicatorExpressionManagerComponent, TextField)).not.to.throw();
    });

    describe('description field', () => {
        let descriptionComponent;

        beforeEach(() => {
            descriptionComponent = findRenderedComponentWithType(indicatorExpressionManagerComponent, TextField);
        });

        it('should have the a floatingLabelText that equals the descriptionLabel property', () => {
            expect(descriptionComponent.props.floatingLabelText).to.equal('Numerator description');
        });

        it('should set the value of the description onto the state after change', () => {
            const inputBox = React.findDOMNode(descriptionComponent).querySelector('input');
            inputBox.value = 'My indicator expression description';

            Simulate.change(inputBox);

            expect(indicatorExpressionManagerComponent.state.description).to.equal('My indicator expression description');
        });
    });
});
