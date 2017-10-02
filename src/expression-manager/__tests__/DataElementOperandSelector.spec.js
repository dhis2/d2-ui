import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import { getStubContext } from '../../../config/inject-theme';
import DataElementOperandSelector from '../DataElementOperandSelector';
import ListSelectAsync from '../../list-select/ListSelectAsync.component';

describe('DataElementOperandSelector component', () => {
    let dataElementOperandSelectorComponent;
    let onItemDoubleClickSpy;

    function renderComponent(props = {}) {
        return shallow(<DataElementOperandSelector {...props} />, {
            context: getStubContext(),
        });
    }

    beforeEach(() => {
        onItemDoubleClickSpy = jest.fn();

        dataElementOperandSelectorComponent = renderComponent({ onItemDoubleClick: onItemDoubleClickSpy });
    });

    it('should have the component name as a class', () => {
        expect(dataElementOperandSelectorComponent.hasClass('data-element-operand-selector')).toBe(true);
    });

    it('should render a ListSelectAsync', () => {
        expect(dataElementOperandSelectorComponent.find(ListSelectAsync)).toHaveLength(1);
    });

    it('should pass the dataElementOperandStore mapped source to the async list', () => {
        const asyncListSelect = dataElementOperandSelectorComponent.find(ListSelectAsync);

        expect(asyncListSelect.props().source).toBe(dataElementOperandSelectorComponent.instance().storeObservable);
    });

    it('should pass the onItemDoubleClick prop down to the asynclist', () => {
        const asyncListSelect = dataElementOperandSelectorComponent.find(ListSelectAsync);

        expect(asyncListSelect.props().onItemDoubleClick).toBe(onItemDoubleClickSpy);
    });

    it('should render a progress bar when the component is loading', () => {
        expect(dataElementOperandSelectorComponent.find(LinearProgress)).toHaveLength(1);
    });

    it('should hide the loading bar if the status isLoading is set to false', () => {
        dataElementOperandSelectorComponent.setState({ isLoading: false });

        expect(dataElementOperandSelectorComponent.find(LinearProgress)).toHaveLength(0);
    });
});
