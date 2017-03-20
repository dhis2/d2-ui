/* eslint no-undef: 0 */

import React from 'react';
import { shallow } from 'enzyme';

import Rule from '../../src/sharing/Rule.component';
import PublicAccess from '../../src/sharing/PublicAccess.component';

import { getStubContext } from '../../config/inject-theme';

const publicAccessProps = {
    canView: true,
    canEdit: false,
    disabled: false,
    onChange: () => {},
}

describe('Sharing: PublicAccess component', () => {
    let publicAccessComponent;

    const renderComponent = (props = {}) => {
        publicAccessComponent = shallow(<PublicAccess {...props} />, {
            context: getStubContext(),
        });

        return publicAccessComponent;
    };

    it('should render a Rule component', () => {
        renderComponent(publicAccessProps);
        expect(publicAccessComponent.find(Rule)).to.have.length(1);
    });

    describe('Rule', () => {
        let ruleComponent;

        renderComponent(publicAccessProps);

        beforeEach(() => {
            ruleComponent = publicAccessComponent.find(Rule);
        });

        it('should have a suitable title', () => {
            expect(ruleComponent.props().primaryText).to.equal('public_access_translated');
        });

        it('should pass the disabled prop along', () => {
            renderComponent({ ...publicAccessProps, disabled: true });
            ruleComponent = publicAccessComponent.find(Rule);
            expect(ruleComponent.props().disabled).to.equal(true);
        });

        it('should receive the access type', () => {
            expect(ruleComponent.props().accessType).to.equal('public');
        })

        it('should pass along the onChange handler', () => {
            const onChangeSpy = sinon.spy();
            renderComponent({ ...publicAccessProps, onChange: onChangeSpy });
            ruleComponent = publicAccessComponent.find(Rule);
            expect(publicAccessComponent.find(Rule).props().onChange).to.equal(onChangeSpy);
        });

        it('should call the change handler when a change event is given', () => {
            const onChangeSpy = sinon.spy();
            renderComponent({ ...publicAccessProps, onChange: onChangeSpy });
            ruleComponent = publicAccessComponent.find(Rule);

            publicAccessComponent.simulate('change');
            expect(onChangeSpy).to.be.calledOnce;
        });
    });
});
