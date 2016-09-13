import React from 'react';
import IndicatorExpressionManager from '../../src/indicator-expression-manager/IndicatorExpressionManager.component';
import {shallow} from 'enzyme';
import {getStubContext} from '../../config/inject-theme';

import DataElementOperandSelector from '../../src/indicator-expression-manager/DataElementOperandSelector.component';
import ProgramOperandSelector from '../../src/indicator-expression-manager/ProgramOperandSelector';

describe('IndicatorExpressionManager component', () => {
    let indicatorExpressionManagerComponent;

    function renderComponent(props = {}) {
        return shallow(<IndicatorExpressionManager {...props} />, {
            context: getStubContext(),
        });
    }

    beforeEach(() => {
        indicatorExpressionManagerComponent = renderComponent();
    });

    describe('DataElementOperandSelector', () => {
        it('should have rendered', () => {
            expect(indicatorExpressionManagerComponent.find(DataElementOperandSelector)).to.have.length(1);
        });
    });

    describe('ProgramOperandSelector', () => {
        it('should have rendered', () => {
            expect(indicatorExpressionManagerComponent.find(ProgramOperandSelector)).to.have.length(1);
        });
    });
});
