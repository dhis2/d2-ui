/*import React from 'react';
import {getStubContext} from '../../config/inject-theme';
import PublicAccess from '../../src/sharing/PublicAccess.component';
import AccessMaskSwitches from '../../src/sharing/AccessMaskSwitches.component';
import Toggle from 'material-ui/Toggle/Toggle';

import {shallow} from 'enzyme';

describe('Sharing: PublicAccess component', () => {
    let publicAccessComponent;

    const renderComponent = (props = {}) => {
        publicAccessComponent = shallow(<PublicAccess {...props} />, {
            context: getStubContext(),
        });

        return publicAccessComponent;
    };

    it('should render a AccessMaskSwitches component', () => {
        renderComponent({publicAccess: '--------'});

        expect(publicAccessComponent.find(AccessMaskSwitches)).to.have.length(1);
    });

    it('should pass a translated label to ', () => {
        expect(publicAccessComponent.find(AccessMaskSwitches).props().label).to.equal('public_access_translated');
    });

    it('should pass the passed access mask', () => {
        expect(publicAccessComponent.find(AccessMaskSwitches).props().accessMask).to.equal('--------');
    });

    it('should pass the name `publicAccess` to the AccessMaskSwitches', () => {
        expect(publicAccessComponent.find(AccessMaskSwitches).props().name).to.equal('publicAccess');
    });

    it('should pass the disabled prop along', () => {
        renderComponent({disabled: true});

        expect(publicAccessComponent.find(AccessMaskSwitches).props().disabled).to.be.true;
    });

    it('should pass along the onChange handler', () => {
        const onChangeSpy = spy();
        renderComponent({disabled: true, onChange: onChangeSpy});

        expect(publicAccessComponent.find(AccessMaskSwitches).props().onChange).to.equal(onChangeSpy);
    });

    it('should call the change handler when a change event is given', () => {
        const onChangeSpy = spy();
        renderComponent({disabled: true, onChange: onChangeSpy});

        publicAccessComponent.simulate('change');

        expect(onChangeSpy).to.be.calledOnce;
    });
});
*/
