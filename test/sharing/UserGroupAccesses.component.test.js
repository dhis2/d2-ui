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

/*
describe('Sharing: UserGroupAccesses component', () => {
    let userGroupAccessesComponent;
    const userGroupAccesses = [
        {access: 'r-------', id: 'wl5cDMuUhmF'},
        {access: 'r-------', id: 'lFHP5lLkzVr'},
    ];

    const renderComponent = (props = {}) => {
        userGroupAccessesComponent = shallow(<UserGroupAccesses {...props} />, {
            context: getStubContext(),
        });

        return userGroupAccessesComponent;
    };

    it('should render one AccessMaskSwitches for each of the userGroupsAccesses', () => {
        renderComponent({userGroupAccesses});

        expect(userGroupAccessesComponent.find(AccessMaskSwitches)).to.have.length(2);
    });

    it('should call the passed onChange method when one of the userGroup accesses has changed', () => {
        const expectedCallBackArgument = [
            {access: 'rw------', id: 'wl5cDMuUhmF'},
            {access: 'r-------', id: 'lFHP5lLkzVr'},
        ];

        const onChangeSpy = spy();
        renderComponent({userGroupAccesses, onChange: onChangeSpy});

        const accessMaskSwitches = userGroupAccessesComponent.find(AccessMaskSwitches).first();
        accessMaskSwitches.simulate('change', 'rw------');

        expect(onChangeSpy).to.be.calledWith(expectedCallBackArgument);
    });

    it('should not modify the userGroupAccesses props', () => {
        const onChangeSpy = spy();
        renderComponent({userGroupAccesses, onChange: onChangeSpy});

        const accessMaskSwitches = userGroupAccessesComponent.find(AccessMaskSwitches).first();
        accessMaskSwitches.simulate('change', 'rw------');

        expect(userGroupAccesses[0].access).to.equal('r-------');
    });

    it('should not throw when no onChange has been passed', () => {
        renderComponent({userGroupAccesses});

        const accessMaskSwitches = userGroupAccessesComponent.find(AccessMaskSwitches).first();
        expect(() => accessMaskSwitches.simulate('change', 'rw------')).not.to.throw();
    });
});

*/
