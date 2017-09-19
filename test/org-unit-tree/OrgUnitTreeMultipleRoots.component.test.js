
import React from 'react';
import {shallow} from 'enzyme';
import Model from 'd2/lib/model/Model';
import ModelDefinition from 'd2/lib/model/ModelDefinition';
import OrgUnitTreeMultipleRoots from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';

describe('OrgUnitTreeMultipleRoots component', () => {
    let rootModel;

    beforeEach(() => {
        rootModel = new Model(new ModelDefinition({ singular: 'organisationUnit', plural: 'organisationUnits' }, {}, {}, {}, {}));

        rootModel.displayName = 'Norway';
    });

    it('Should pass the correct model to the OrgUnitTree component', () => {
        const component = shallow(<OrgUnitTreeMultipleRoots roots={[rootModel]} />);

        expect(component.find(OrgUnitTree).props().root).toBe(rootModel);
    });
});
