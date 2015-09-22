import React from 'react/addons';
import {element} from 'd2-testutils';
import injectTheme from '../config/inject-theme';
import IndicatorExpressionManager from '../../src/indicator-expression-manager/IndicatorExpressionManager.component';
import DataElementOperandSelector from '../../src/indicator-expression-manager/DataElementOperandSelector.component';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
} = TestUtils;

describe('IndicatorExpressionManager component', () => {
    let indicatorExpressionManagerComponent;

    beforeEach(() => {
        const IndicatorExpressionManagerWithContext = injectTheme(IndicatorExpressionManager);

        const renderedComponents = TestUtils.renderIntoDocument(
            <IndicatorExpressionManagerWithContext />);
        indicatorExpressionManagerComponent = findRenderedComponentWithType(renderedComponents, IndicatorExpressionManager);
    });

    it('should have the component name as a class', () => {
        expect(element(indicatorExpressionManagerComponent.getDOMNode()).hasClass('indicator-expression-manager')).to.be.true;
    });

    it('should have a rendered DataElementOperandSelector', () => {
        expect(() => findRenderedComponentWithType(indicatorExpressionManagerComponent, DataElementOperandSelector)).not.to.throw();
    });
});
