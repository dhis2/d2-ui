
import React from 'react';
import {shallow} from 'enzyme';

import OrgUnitTreeMultipleRoots from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

import Model from 'd2/lib/model/Model';
import ModelDefinition from 'd2/lib/model/ModelDefinition';

describe('OrgUnitTreeMultipleRoots component', () => {
    let rootModel;

    beforeEach(() => {
        rootModel = new Model(new ModelDefinition({ singular: 'organisationUnit', plural: 'organisationUnits' }, {}, {}, {}, {}));

        rootModel.displayName = 'Norway';
    });

    it('Should pass the correct model to the OrgUnitTree component', () => {
        const component = shallow(<OrgUnitTreeMultipleRoots roots={[rootModel]} />);

        expect(component.find(OrgUnitTree).props().root).to.equal(rootModel);
    });
});
