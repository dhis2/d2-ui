import React from 'react';
import { shallow } from 'enzyme';
import Model from 'd2/lib/model/Model';
import ModelDefinition from 'd2/lib/model/ModelDefinition';
import OrgUnitTree from '../OrgUnitTree.component';
import TreeView from '../../tree-view/TreeView.component';

describe('OrgUnitTree component', () => {
    let rootModel;

    beforeEach(() => {
        rootModel = new Model(new ModelDefinition({ singular: 'organisationUnit', plural: 'organisationUnits' }, {}, {}, {}, {}));

        rootModel.displayName = 'Norway';
        rootModel.children = { hasUnloadedData: false, toArray: () => [] }; // Pretend to support lazy-loading children
    });

    it('should pass the displayName as the label to the TreeView', () => {
        const component = shallow(<OrgUnitTree root={rootModel} />);

        expect(component.find(TreeView).props().label.props.children[1]).toBe('Norway');
    });
});
