import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import PermissionOption from '../PermissionOption.component';
import PermissionPicker from '../PermissionPicker.component';
import { getStubContext } from '../../../../config/inject-theme';

const permissionPickerProps = {
    access: {
        meta: { canView: true, canEdit: true },
        data: { canView: true, canEdit: true },
    },
    accessOptions: {
        meta: { canView: true, canEdit: true, noAccess: true },
        data: { canView: true, canEdit: true, noAccess: true },
    },
    onChange: () => {},
    disabled: false,
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
        expect(permissionPickerComponent.find(IconButton)).toHaveLength(1);
    });

    it('should render three PermissionOptions if no data options, but all metadata options are available', () => {
        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            accessOptions: {
                meta: { canView: true, canEdit: true, noAccess: true },
            },
        });

        expect(permissionPickerComponent.find(PermissionOption)).toHaveLength(
            3
        );
    });

    it('should render six PermissionOptions if all access options are available', () => {
        expect(permissionPickerComponent.find(PermissionOption)).toHaveLength(
            6
        );
    });

    it('should render the checkmark SvgIcon according to the permission values', () => {
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(0)
                .props().isSelected
        ).toBe(true);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(1)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(2)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(3)
                .props().isSelected
        ).toBe(true);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(4)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(5)
                .props().isSelected
        ).toBe(false);

        permissionPickerComponent = renderComponent({
            ...permissionPickerProps,
            access: {
                data: { canView: false, canEdit: false },
                meta: { canView: false, canEdit: false },
            },
        });

        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(0)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(1)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(2)
                .props().isSelected
        ).toBe(true);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(3)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(4)
                .props().isSelected
        ).toBe(false);
        expect(
            permissionPickerComponent
                .find(PermissionOption)
                .at(5)
                .props().isSelected
        ).toBe(true);
    });
});
