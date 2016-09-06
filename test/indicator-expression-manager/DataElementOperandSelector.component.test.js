import React from 'react';
import {getStubContext} from '../../config/inject-theme';

import DataElementOperandSelector from '../../src/indicator-expression-manager/DataElementOperandSelector.component';
import ListSelectAsync from '../../src/list-select/ListSelectAsync.component';
import {shallow} from 'enzyme';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import dataElementOperandStore from '../../src/indicator-expression-manager/dataElementOperand.store';

describe('DataElementOperandSelector component', () => {
    let dataElementOperandSelectorComponent;
    let onItemDoubleClickSpy;

    function renderComponent(props = {}) {
        return shallow(<DataElementOperandSelector {...props} />, {
            context: getStubContext(),
        });
    }

    beforeEach(() => {
        onItemDoubleClickSpy = spy();

        dataElementOperandSelectorComponent = renderComponent({onItemDoubleClick: onItemDoubleClickSpy});
    });

    it('should have the component name as a class', () => {
        expect(dataElementOperandSelectorComponent.hasClass('data-element-operand-selector')).to.be.true;
    });

    it('should render a ListSelectAsync', () => {
        expect(dataElementOperandSelectorComponent.find(ListSelectAsync)).to.have.length(1);
    });

    it('should pass the dataElementOperandStore mapped source to the async list', () => {
        const asyncListSelect = dataElementOperandSelectorComponent.find(ListSelectAsync);

        expect(asyncListSelect.props().source).to.equal(dataElementOperandSelectorComponent.instance().storeObservable);
    });

    it('should pass the onItemDoubleClick prop down to the asynclist', () => {
        const asyncListSelect = dataElementOperandSelectorComponent.find(ListSelectAsync);

        expect(asyncListSelect.props().onItemDoubleClick).to.equal(onItemDoubleClickSpy);
    });

    it('should render a progress bar when the component is loading', () => {
        expect(dataElementOperandSelectorComponent.find(LinearProgress)).to.have.length(1);
    });

    it('should hide the loading bar if the status isLoading is set to false', () => {
        dataElementOperandSelectorComponent.setState({isLoading: false});

        expect(dataElementOperandSelectorComponent.find(LinearProgress)).to.have.length(0);
    });

    describe('data loading', () => {
        const mock = sinon.mock(dataElementOperandStore);

        mock.expects('tap').once().returns(dataElementOperandStore);

        renderComponent();

        mock.verify();
    });
});
