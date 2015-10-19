import React from 'react/addons';
import injectTheme from '../config/inject-theme';
import UserGroupAccesses from '../../src/sharing/UserGroupAccesses.component';
import Toggle from 'material-ui/lib/toggle';
import AccessMaskSwitches from '../../src/sharing/AccessMaskSwitches.component';

const {
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    renderIntoDocument,
    Simulate,
    } = React.addons.TestUtils;

describe('Sharing: UserGroupAccesses component', () => {
    let userGroupAccessesComponent;
    const userGroupAccesses = [
        {access: 'r-------', id: 'wl5cDMuUhmF'},
        {access: 'r-------', id: 'lFHP5lLkzVr'},
    ];

    const renderComponent = (props = {}) => {
        const UserGroupAccessesWithContext = injectTheme(UserGroupAccesses);
        const renderedComponents = renderIntoDocument(<UserGroupAccessesWithContext {...props} />);

        userGroupAccessesComponent = findRenderedComponentWithType(renderedComponents, UserGroupAccesses);
        return userGroupAccessesComponent;
    };

    it('should render one AccessMaskSwitches for each of the userGroupsAccesses', () => {
        renderComponent({userGroupAccesses});

        expect(scryRenderedComponentsWithType(userGroupAccessesComponent, AccessMaskSwitches).length).to.equal(2);
    });

    it('should call the passed onChange method when one of the userGroup accesses has changed', () => {
        const expectedCallBackArgument = [
            {access: 'rw------', id: 'wl5cDMuUhmF'},
            {access: 'r-------', id: 'lFHP5lLkzVr'},
        ];

        const onChangeSpy = spy();
        renderComponent({userGroupAccesses, onChange: onChangeSpy});

        const  editToggleComponent = scryRenderedComponentsWithType(userGroupAccessesComponent, Toggle)[1];
        const inputComponent = React.findDOMNode(editToggleComponent).querySelector('input');

        Simulate.change(inputComponent);

        expect(onChangeSpy).to.be.calledWith(expectedCallBackArgument);
    });
});
