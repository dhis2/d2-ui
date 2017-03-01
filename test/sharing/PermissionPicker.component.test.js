/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

import React from 'react';
import log from 'loglevel';
import { shallow } from 'enzyme';

import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';

import PermissionPicker from '../../src/sharing/PermissionPicker.component';

import { getStubContext } from '../../config/inject-theme';

const permissionPickerProps = {
    accessOptions: { canView: true, canEdit: true },
    onChange: () => {},
    disabled: false,
    disableWritePermission: false,
    disableNoAccess: false,
}

describe('Sharing: PermissionPicker component', () => {
    let permissionPickerComponent;

    const renderComponent = (props = {}) =>
        shallow(<PermissionPicker {...props} />, {
            context: getStubContext(),
        });

    beforeEach(() => {
        permissionPickerComponent = renderComponent(permissionPickerProps);
    });

    it('should render an IconButton', () => {
        expect(permissionPickerComponent.find(IconMenu)).to.have.length(1);
    });

    it('should render three MenuItems if all access options are available', () => {
        expect(permissionPickerComponent.find(MenuItem)).to.have.length(3);
    });

    it('should render two MenuItems if disableWritePermission is false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableWritePermission: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).to.have.length(2);
    })

    it('should render two MenuItems if disableNoAccess is false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableNoAccess: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).to.have.length(2);
    })

    it('should render one MenuItems if disableWritePermission and disableNoAccess are both false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableWritePermission: true,
            disableNoAccess: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).to.have.length(1);
    })

    it('should render the checkmark FontIcon according to the permission values', () => {
        expect(permissionPickerComponent.find(MenuItem).at(0).props().leftIcon.props.children).to.equal('done');
        expect(permissionPickerComponent.find(MenuItem).at(1).props().leftIcon.props.children).to.equal('');
        expect(permissionPickerComponent.find(MenuItem).at(2).props().leftIcon.props.children).to.equal('');
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            accessOptions: { canEdit: false, canView: true },
        });
        expect(permissionPickerComponent.find(MenuItem).at(0).props().leftIcon.props.children).to.equal('');
        expect(permissionPickerComponent.find(MenuItem).at(1).props().leftIcon.props.children).to.equal('done');
    });

    it('should fire the onChange callback on change', () => {
        const onChangeSpy = sinon.spy();
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            onChange: onChangeSpy,
        });

        permissionPickerComponent.simulate('change');
        expect(onChangeSpy).to.be.called;
    });
});
