import React from 'react';
import { shallow } from 'enzyme';
import Rule from '../Rule.component';
import { getStubContext } from '../../../config/inject-theme';

describe('Sharing: Rule component', () => {
    let ruleComponent;
    const renderComponent = (props = {}) => {
        ruleComponent = shallow(<Rule {...props} />, {
            context: getStubContext(),
        });
    };

    const sharingRule = {
        accessType: 'user',
        primaryText: 'Tom Wakiki',
        secondaryText: 'user',
        accessOptions: {
            canEdit: true,
            canView: true,
        },
        onChange: () => {},
        onRemove: () => {},
        disabled: false,
        disableWritePermission: false,
        disableNoAccess: false,
    };

    renderComponent(sharingRule);

    it('should render subcomponents', () => {
        expect(ruleComponent.find('FontIcon')).toHaveLength(1);
        expect(ruleComponent.find('PermissionPicker')).toHaveLength(1);
        expect(ruleComponent.find('IconButton')).toHaveLength(1);
    });

    it('should show the primary and secondary text', () => {
        expect(ruleComponent.text()).toContain(sharingRule.primaryText);
        expect(ruleComponent.text()).toContain(sharingRule.secondaryText);
    });
});
