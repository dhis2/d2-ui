import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PermissionOption from '../PermissionOption.component';

const permissionOptionProps = {
    disabled: false,
    isSelected: false,
    primaryText: 'Test',
    onClick: () => {},
};

describe('Sharing: PermissionOption component', () => {
    let permissionOptionComponent;

    const renderComponent = (props = {}) =>
        shallow(<PermissionOption {...props} />);

    beforeEach(() => {
        permissionOptionComponent = renderComponent(permissionOptionProps);
    });

    it('should render a MenuItem', () => {
        expect(permissionOptionComponent.find(MenuItem)).toHaveLength(1);
    });

    it('should not render a MenuItem when disabled prop is passed', () => {
        permissionOptionComponent = renderComponent({
            ...permissionOptionProps,
            disabled: true,
        });

        expect(permissionOptionComponent.find(MenuItem)).toHaveLength(0);
    });

    it('should render the text according to the primaryText prop', () => {
        expect(permissionOptionComponent.find(MenuItem).dive().find(ListItemText).props().primary).toEqual(
            permissionOptionProps.primaryText
        );
    });

    it('should set the MenuItem left icon according to the isSelected prop', () => {
        expect(permissionOptionComponent.find(ListItemIcon)).toHaveLength(0);

        permissionOptionComponent = renderComponent({
            ...permissionOptionProps,
            isSelected: true,
        });

        expect(permissionOptionComponent.find(ListItemIcon)).toHaveLength(1);
    });
});
