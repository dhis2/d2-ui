import React from 'react/addons';
import injectTheme from '../../config/inject-theme';
import IndicatorExpressionManager from '../../src/indicator-expression-manager/IndicatorExpressionManager.component';
import DataElementOperandSelector from '../../src/indicator-expression-manager/DataElementOperandSelector.component';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
} = TestUtils;

xdescribe('IndicatorExpressionManager component', () => {
    let indicatorExpressionManagerComponent;
    let d2Mock;

    beforeEach(() => {
        d2Mock = {
            models: {
                dataElementOperand: {
                    list: spy(),
                },
            },
        };

        const IndicatorExpressionManagerWithContext = injectTheme(IndicatorExpressionManager);
        const shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<IndicatorExpressionManagerWithContext d2={d2Mock} />);

        const renderedComponents = shallowRenderer.getRenderOutput()

        console.log('===============');
        console.log(renderedComponents);
        console.log('===============');

        indicatorExpressionManagerComponent = findRenderedComponentWithType(renderedComponents, IndicatorExpressionManager);
    });

    it('should have the component name as a class', () => {
        expect(element(indicatorExpressionManagerComponent.getDOMNode()).hasClass('indicator-expression-manager')).to.be.true;
    });

    it('should have a rendered DataElementOperandSelector', () => {
        expect(() => findRenderedComponentWithType(indicatorExpressionManagerComponent, DataElementOperandSelector)).not.to.throw();
    });
});
