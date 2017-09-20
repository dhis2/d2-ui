import React from 'react';
import { shallow } from 'enzyme';
import Rule from '../Rule.component';
import ExternalAccess from '../ExternalAccess.component';
import { getStubContext } from '../../../config/inject-theme';

describe('Sharing: ExternalAccess component', () => {
    let externalAccessComponent;

    const renderComponent = (props = {}) => {
        externalAccessComponent = shallow(<ExternalAccess {...props} />, {
            context: getStubContext(),
        });

        return externalAccessComponent;
    };

    it('should render a Rule component', () => {
        renderComponent({ canView: true, disabled: false, onChange: () => {} });
        expect(externalAccessComponent.find(Rule)).toHaveLength(1);
    });

    describe('Rule', () => {
        let ruleComponent;
        let onChange;

        beforeEach(() => {
            onChange = jest.fn();
            ruleComponent = externalAccessComponent.find(Rule);
            renderComponent({ canView: true, disabled: false, onChange });
        });

        it('should have a suitable title', () => {
            expect(ruleComponent.props().primaryText).toBe('external_access_translated');
        });

        it('should describe the access as viewable if external access is enabled', () => {
            expect(ruleComponent.props().secondaryText.toLowerCase())
              .toBe('anyone_can_view_without_a_login_translated');
        });

        it('should have no access if external access is disabled', () => {
            renderComponent({ canView: false, disabled: false, onChange });
            ruleComponent = externalAccessComponent.find(Rule);
            expect(ruleComponent.props().secondaryText.toLowerCase()).toBe('no_access_translated');
        });
    });
});
