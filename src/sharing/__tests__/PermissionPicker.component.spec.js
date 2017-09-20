import React from 'react';
import { shallow } from 'enzyme';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import PermissionPicker from '../PermissionPicker.component';
import { getStubContext } from '../../../config/inject-theme';

const permissionPickerProps = {
    accessOptions: { canView: true, canEdit: true },
    onChange: () => {},
    disabled: false,
    disableWritePermission: false,
    disableNoAccess: false,
};

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
        expect(permissionPickerComponent.find(IconMenu)).toHaveLength(1);
    });

    it('should render three MenuItems if all access options are available', () => {
        expect(permissionPickerComponent.find(MenuItem)).toHaveLength(3);
    });

    it('should render two MenuItems if disableWritePermission is false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableWritePermission: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).toHaveLength(2);
    });

    it('should render two MenuItems if disableNoAccess is false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableNoAccess: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).toHaveLength(2);
    });

    it('should render one MenuItems if disableWritePermission and disableNoAccess are both false', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            disableWritePermission: true,
            disableNoAccess: true,
        });

        expect(permissionPickerComponent.find(MenuItem)).toHaveLength(1);
    });

    it('should render the checkmark FontIcon according to the permission values', () => {
        expect(permissionPickerComponent.find(MenuItem).at(0).props().leftIcon.props.children).toBe('done');
        expect(permissionPickerComponent.find(MenuItem).at(1).props().leftIcon.props.children).toBe('');
        expect(permissionPickerComponent.find(MenuItem).at(2).props().leftIcon.props.children).toBe('');
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            accessOptions: { canEdit: false, canView: true },
        });
        expect(permissionPickerComponent.find(MenuItem).at(0).props().leftIcon.props.children).toBe('');
        expect(permissionPickerComponent.find(MenuItem).at(1).props().leftIcon.props.children).toBe('done');
    });

    it('should fire the onChange callback on change', () => {
        const onChangeSpy = jest.fn();
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            onChange: onChangeSpy,
        });

        permissionPickerComponent.simulate('change');
        expect(onChangeSpy).toHaveBeenCalled();
    });
});
