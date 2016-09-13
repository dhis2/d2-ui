import React from 'react';
import ConstantSelector from '../../src/indicator-expression-manager/ConstantSelector.component';
import ListSelectWithLocalSearch from '../../src/list-select/ListSelectWithLocalSearch.component';
import {shallow} from 'enzyme';

xdescribe('ConstantSelector', () => {
    let constantSelector;

    function renderComponent(props = {}) {
        return shallow(<ConstantSelector {...props} />);
    }

    beforeEach(() => {
        constantSelector = renderComponent();
    });

    it('should render the ConstantSelector component', () => {
        expect(constantSelector).to.have.length(1);
    });

    it('should render a ListSelectWithLocalSearch component', () => {
        expect(constantSelector.find(ListSelectWithLocalSearch)).to.have.length(1);
    });

    it('should pass the props passed to the ConstantSelector to the ListSelect', () => {
        constantSelector = renderComponent({myName: 'John'});
        const listSelect = constantSelector.find(ListSelectWithLocalSearch);

        expect(listSelect.props()).to.deep.equal(constantSelector.props());
    });
});
