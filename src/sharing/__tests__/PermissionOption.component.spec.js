import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from 'material-ui/MenuItem';
import PermissionOption from '../PermissionOption.component';
import { getStubContext } from '../../../config/inject-theme';

const permissionOptionProps = {
    disabled: false,
    isSelected: false,
    primaryText: 'Test',
    value: {},
    onClick: undefined,
    focusState: 'none',
};

describe('Sharing: PermissionOption component', () => {
    let permissionOptionComponent;

    const renderComponent = (props = {}) =>
        shallow(<PermissionOption {...props} />, {
            context: getStubContext(),
        });

    beforeEach(() => {
        permissionOptionComponent = renderComponent(permissionOptionProps);
    });

    it('should not render a MenuItem when disabled prop is passed', () => {
        permissionOptionComponent = renderComponent({
            ...permissionOptionProps,
            disabled: true,
        });

        expect(permissionOptionComponent.find(MenuItem)).toHaveLength(0);
    });

    it('should render a MenuItem', () => {
        expect(permissionOptionComponent.find(MenuItem)).toHaveLength(1);
    });

    it('should render the text according to the primaryText prop', () => {
        expect(permissionOptionComponent.find(MenuItem).props().primaryText).toEqual(
            permissionOptionProps.primaryText
        );
    });

    it('should set the MenuItem leftIcon prop according to the isSelected prop', () => {
        expect(permissionOptionComponent.find(MenuItem).props().leftIcon).toBeUndefined();

        permissionOptionComponent = renderComponent({
            ...permissionOptionProps,
            isSelected: true,
        });

        expect(permissionOptionComponent.find(MenuItem).props().leftIcon).not.toBeUndefined();
    });

    it('should set the value prop', () => {
        expect(permissionOptionComponent.find(MenuItem).props().value).toEqual(
            permissionOptionProps.value
        );

        const newValue = { somekey: 'somevalue' };

        permissionOptionComponent = renderComponent({
            ...permissionOptionProps,
            value: newValue,
        });

        expect(permissionOptionComponent.find(MenuItem).props().value).toEqual(newValue);
    });
});
