import React from 'react';
import {getStubContext} from '../../config/inject-theme';
import AccessMaskSwitches from '../../src/sharing/AccessMaskSwitches.component';
import Toggle from 'material-ui/Toggle/Toggle';

import {shallow} from 'enzyme';

describe('Sharing: AccessMaskSwitches component', () => {
    let accessMaskSwitchesComponent;

    const renderComponent = (props = {}) => {
        accessMaskSwitchesComponent = shallow(<AccessMaskSwitches {...props} />, {
            context: getStubContext(),
        });
    };

    it('should render a toggle component for view and for edit', () => {
        renderComponent({accessMask: '--------'});

        expect(accessMaskSwitchesComponent.find(Toggle)).to.have.length(2);
    });

    it('should display the passed label', () => {
        renderComponent({accessMask: '--------', label: 'Another awesome group of users'});
        const labelComponent = accessMaskSwitchesComponent
            .children().first();

        expect(labelComponent.text()).to.equal('Another awesome group of users');
    });

    describe('Toggle for View', () => {
        let viewToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({accessMask: '--------', name: 'accessMaskSwitches'});

            viewToggleComponent = accessMaskSwitchesComponent.find(Toggle).first();
        });

        it('should give the toggle the name accessMaskSwitches', () => {
            expect(viewToggleComponent.props().name).to.equal('accessMaskSwitchesView');
        });

        it('should give the toggle the accessMaskSwitches label', () => {
            expect(viewToggleComponent.props().label).to.equal('can_view_translated');
        });

        it('should render the component as not toggled', () => {
            expect(viewToggleComponent.props().checked).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({accessMask: 'r-------'});
            viewToggleComponent = accessMaskSwitchesComponent.find(Toggle).first();

            expect(viewToggleComponent.props().checked).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({accessMask: '--------', onChange: onChange});
            viewToggleComponent = accessMaskSwitchesComponent.find(Toggle).first();

            viewToggleComponent.simulate('toggle');

            expect(onChange).to.be.calledWith('r-------');
        });

        it('should unset the read flag when the toggle is clicked', () => {
            renderComponent({accessMask: 'r-------', onChange: onChange});
            viewToggleComponent = accessMaskSwitchesComponent.find(Toggle).first();

            viewToggleComponent.simulate('toggle');

            expect(onChange).to.be.calledWith('--------');
        });

        it('should render the view button as toggled and disabled if the edit is there', () => {
            renderComponent({accessMask: 'rw------'});
            viewToggleComponent = accessMaskSwitchesComponent.find(Toggle).first();

            expect(viewToggleComponent.props().checked).to.be.true;
            expect(viewToggleComponent.props().disabled).to.be.true;
        });

        it('should not fail when there is no onChange handler', () => {
            renderComponent({});

            expect(() => viewToggleComponent.simulate('toggle')).not.to.throw();
        });
    });

    describe('Toggle for Edit', () => {
        let editToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({accessMask: '--------', name: 'accessMaskSwitches'});
            editToggleComponent = accessMaskSwitchesComponent.find(Toggle).at(1);
        });

        it('should give the toggle the name accessMaskSwitchesEdit', () => {
            expect(editToggleComponent.props().name).to.equal('accessMaskSwitchesEdit');
        });

        it('should give the toggle the accessMaskSwitchesEdit label', () => {
            expect(editToggleComponent.props().label).to.equal('can_edit_translated');
        });

        it('should render the component as not toggled', () => {
            expect(editToggleComponent.props().checked).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({accessMask: 'rw------'});
            editToggleComponent = accessMaskSwitchesComponent.find(Toggle).at(1);

            expect(editToggleComponent.props().checked).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({accessMask: '--------', onChange: onChange});
            editToggleComponent = accessMaskSwitchesComponent.find(Toggle).at(1);

            editToggleComponent.simulate('toggle');

            expect(onChange).to.be.calledWith('rw------');
        });

        it('should deselect the write flag when the toggle is clicked', () => {
            renderComponent({accessMask: 'rw------', onChange: onChange});
            editToggleComponent = accessMaskSwitchesComponent.find(Toggle).at(1);

            editToggleComponent.simulate('toggle');

            expect(onChange).to.be.calledWith('r-------');
        });
    });
});
