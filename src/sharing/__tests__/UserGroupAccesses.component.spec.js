import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/inject-theme';
import UserGroupAccess from '../UserGroupAccess.component';
import Rule from '../Rule.component';

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

    beforeEach(() => {
        renderComponent(userGroupAccessProps);
    });

    it('should render a Rule component', () => {
        expect(userGroupAccessComponent.find(Rule)).toHaveLength(1);
    });

    it('should render the primaryText as nameOfGroup', () => {
        expect(userGroupAccessComponent.find(Rule).props().primaryText).toBe(userGroupAccessProps.nameOfGroup);
    });

    it('should render the accessOptions according to canView and canEdit', () => {
        expect(userGroupAccessComponent.find(Rule).props().accessOptions).toEqual({
            canView: userGroupAccessProps.canView,
            canEdit: userGroupAccessProps.canEdit,
        });
    });
});
