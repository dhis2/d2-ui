/* eslint no-undef: 0 */

import React from 'react';
import { shallow } from 'enzyme';

import { getStubContext } from '../../config/inject-theme';
import UserGroupAccess from '../../src/sharing/UserGroupAccess.component';
import Rule from '../../src/sharing/Rule.component';

const userGroupAccessProps = {
    nameOfGroup: 'System administrators',
    groupType: 'userGroup',
    canView: true,
    canEdit: true,
    onChange: () => {},
    onRemove: () => {},
};

describe('Sharing: UserGroupAccess component', () => {
    let userGroupAccessComponent;

    const renderComponent = (props = {}) => {
        userGroupAccessComponent = shallow(<UserGroupAccess {...props} />, {
            context: getStubContext(),
        });

        return userGroupAccessComponent;
    };

    before(() => {
        renderComponent(userGroupAccessProps);
    });

    it('should render a Rule component', () => {
        expect(userGroupAccessComponent.find(Rule)).to.have.length(1);
    });

    it('should render the primaryText as nameOfGroup', () => {
        expect(userGroupAccessComponent.find(Rule).props().primaryText).to.equal(userGroupAccessProps.nameOfGroup);
    });

    it('should render the accessOptions according to canView and canEdit', () => {
        expect(userGroupAccessComponent.find(Rule).props().accessOptions).to.deep.equal({
            canView: userGroupAccessProps.canView,
            canEdit: userGroupAccessProps.canEdit,
        });
    });
});
