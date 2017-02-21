/*import React from 'react';
import {getStubContext} from '../../config/inject-theme';
import ExternalAccess from '../../src/sharing/ExternalAccess.component';
import Toggle from 'material-ui/Toggle/Toggle';

import {shallow} from 'enzyme';

describe('Sharing: ExternalAccess component', () => {
    let externalAccessComponent;

    const renderComponent = (props = {}) => {
        externalAccessComponent = shallow(<ExternalAccess {...props} />, {
            context: getStubContext(),
        });

        return externalAccessComponent;
    };

    it('should render a toggle component', () => {
        renderComponent({externalAccess: false});

        expect(externalAccessComponent.find(Toggle)).to.have.length(1);
    });

    describe('Toggle', () => {
        let toggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({externalAccess: false});
            toggleComponent = externalAccessComponent.find(Toggle);
        });

        it('should give the toggle the name externalAccess', () => {
            expect(toggleComponent.props().name).to.equal('externalAccess');
        });

        it('should give the toggle the externalAccess label', () => {
            expect(toggleComponent.props().label).to.equal('external_access_translated');
        });

        it('should render the component as not toggled', () => {
            expect(toggleComponent.props().checked).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({externalAccess: true});
            toggleComponent = externalAccessComponent.find(Toggle);

            expect(toggleComponent.props().checked).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({externalAccess: false, onChange: onChange});
            toggleComponent = externalAccessComponent.find(Toggle);
            externalAccessComponent.instance().refs = {
                toggle: {
                    isToggled: stub().returns(true),
                },
            };

            toggleComponent.simulate('toggle');

            expect(onChange).to.be.called;
        });

        it('should set the toggle to be disabled', () => {
            renderComponent({externalAccess: false, disabled: true});
            toggleComponent = externalAccessComponent.find(Toggle);

            expect(toggleComponent.props().disabled).to.be.true;
        });
    });
});
*/
