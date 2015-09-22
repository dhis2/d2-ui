import React from 'react/addons';
import {element} from 'd2-testutils';
import DataElementOperandSelector from '../../src/indicator-expression-manager/DataElementOperandSelector.component';
import ListSelectAsync from '../../src/list-select/ListSelectAsync.component';
import {Observable} from 'rx';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
} = React.addons.TestUtils;

describe('DataElementOperandSelector component', () => {
    let dataElementOperandSelectorComponent;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = spy();

        dataElementOperandSelectorComponent = renderIntoDocument(
            <DataElementOperandSelector onItemDoubleClick={onItemDoubleClickSpy} />
        );
    });

    it('should have the component name as a class', () => {
        expect(element(dataElementOperandSelectorComponent.getDOMNode()).hasClass('data-element-operand-selector')).to.be.true;
    });

    it('should render a ListSelectAsync', () => {
        expect(() => findRenderedComponentWithType(dataElementOperandSelectorComponent, ListSelectAsync)).not.to.throw();
    });

    it('should pass the dataElementOperandStore mapped source to the async list', () => {
        const asyncListSelect = findRenderedComponentWithType(dataElementOperandSelectorComponent, ListSelectAsync);

        expect(asyncListSelect.props.source).to.be.instanceof(Observable);
    });

    it('should pass the onItemDoubleClick prop down to the asynclist', () => {
        const asyncListSelect = findRenderedComponentWithType(dataElementOperandSelectorComponent, ListSelectAsync);

        expect(asyncListSelect.props.onItemDoubleClick).to.equal(onItemDoubleClickSpy);
    });
});
