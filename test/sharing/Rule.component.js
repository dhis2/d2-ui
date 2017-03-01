/* eslint no-undef: 0 */

import React from 'react';
import { shallow } from 'enzyme';

import Rule from '../../src/sharing/Rule.component';
import { getStubContext } from '../../config/inject-theme';

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
        expect(ruleComponent.find('FontIcon')).to.have.length(1);
        expect(ruleComponent.find('PermissionPicker')).to.have.length(1);
        expect(ruleComponent.find('IconButton')).to.have.length(1);
    });

    it('should show the primary and secondary text', () => {
        expect(ruleComponent.text()).to.contain(sharingRule.primaryText);
        expect(ruleComponent.text()).to.contain(sharingRule.secondaryText);
    });
});
