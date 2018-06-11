import React from 'react';
import ConstantSelector from '../ConstantSelector';
import { ListSelectWithLocalSearch } from '@dhis2/d2-ui-core';
import { shallow } from 'enzyme';

xdescribe('ConstantSelector', () => {
    let constantSelector;

    function renderComponent(props = {}) {
        return shallow(<ConstantSelector {...props} />);
    }

    beforeEach(() => {
        constantSelector = renderComponent();
    });

    it('should render the ConstantSelector component', () => {
        expect(constantSelector).toHaveLength(1);
    });

    it('should render a ListSelectWithLocalSearch component', () => {
        expect(constantSelector.find(ListSelectWithLocalSearch)).toHaveLength(1);
    });

    it('should pass the props passed to the ConstantSelector to the ListSelect', () => {
        constantSelector = renderComponent({ myName: 'John' });
        const listSelect = constantSelector.find(ListSelectWithLocalSearch);

        expect(listSelect.props()).toEqual(constantSelector.props());
    });
});
