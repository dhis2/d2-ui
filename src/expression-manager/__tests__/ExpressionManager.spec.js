import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/inject-theme';
import ExpressionManager from '../ExpressionManager';
import DataElementOperandSelector from '../DataElementOperandSelector';
import ProgramOperandSelector from '../ProgramOperandSelector';

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
            expect(expressionManagerComponent.find(DataElementOperandSelector)).toHaveLength(1);
        });
    });

    describe('ProgramOperandSelector', () => {
        it('should have rendered', () => {
            expect(expressionManagerComponent.find(ProgramOperandSelector)).toHaveLength(1);
        });
    });
});
