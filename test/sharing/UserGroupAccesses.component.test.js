import React from 'react/addons';
import {getStubContext} from '../../config/inject-theme';
import UserGroupAccesses from '../../src/sharing/UserGroupAccesses.component';
import Toggle from 'material-ui/lib/toggle';
import AccessMaskSwitches from '../../src/sharing/AccessMaskSwitches.component';
import {shallow} from 'enzyme';

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
