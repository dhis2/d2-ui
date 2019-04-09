import React from 'react';
import { shallow } from 'enzyme';
import { TreeView } from '@dhis2/d2-ui-core';
import OrgUnitTree from '../OrgUnitTree.component';

describe.skip('OrgUnitTree component', () => {
    let rootModel;

    beforeEach(() => {
        rootModel = {};
        rootModel.displayName = 'Norway';
        rootModel.children = { hasUnloadedData: false, toArray: () => [] }; // Pretend to support lazy-loading children
    });

    it('should pass the displayName as the label to the TreeView', () => {
        const component = shallow(<OrgUnitTree root={rootModel} />);

        expect(component.find(TreeView).props().label.props.children[1]).toBe('Norway');
    });
});
