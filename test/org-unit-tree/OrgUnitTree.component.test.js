import React from 'react';
import {shallow} from 'enzyme';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';
import TreeView from '../../src/tree-view/TreeView.component';

import Model from 'd2/lib/model/Model';
import ModelDefinition from 'd2/lib/model/ModelDefinition';

describe('OrgUnitTree component', () => {
    let rootModel;

    beforeEach(() => {
        rootModel = new Model(new ModelDefinition('organisationUnit', 'organisationUnits', {}, [], {}, [], []));

        rootModel.displayName = 'Norway';
    });

    it('should pass the displayName as the label to the TreeView', () => {
        const component = shallow(<OrgUnitTree root={rootModel} />);

        expect(component.find(TreeView).props().label.props.children[0]).to.equal('Norway');
    });
});
