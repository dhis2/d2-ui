import React from 'react';
import ExpressionManager from '../../src/expression-manager/ExpressionManager';
import {shallow} from 'enzyme';
import {getStubContext} from '../../config/inject-theme';

import DataElementOperandSelector from '../../src/expression-manager/DataElementOperandSelector';
import ProgramOperandSelector from '../../src/expression-manager/ProgramOperandSelector';

describe('ExpressionManager component', () => {
    let expressionManagerComponent;

    function renderComponent(props = {}) {
        return shallow(<ExpressionManager {...props} />, {
            context: getStubContext(),
        });
    }

    beforeEach(() => {
        expressionManagerComponent = renderComponent();
    });

    describe('DataElementOperandSelector', () => {
        it('should have rendered', () => {
            expect(expressionManagerComponent.find(DataElementOperandSelector)).to.have.length(1);
        });
    });

    describe('ProgramOperandSelector', () => {
        it('should have rendered', () => {
            expect(expressionManagerComponent.find(ProgramOperandSelector)).to.have.length(1);
        });
    });
});
