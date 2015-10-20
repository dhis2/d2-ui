import React from 'react/addons';
import injectTheme from '../config/inject-theme';
import AccessMaskSwitches from '../../src/sharing/AccessMaskSwitches.component';
import Toggle from 'material-ui/lib/toggle';

const {
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    renderIntoDocument,
    Simulate,
} = React.addons.TestUtils;

describe('Sharing: AccessMaskSwitches component', () => {
    let accessMaskSwitchesComponent;

    const renderComponent = (props = {}) => {
        const AccessMaskSwitchesWithContext = injectTheme(AccessMaskSwitches);
        const renderedComponents = renderIntoDocument(<AccessMaskSwitchesWithContext {...props} />);

        accessMaskSwitchesComponent = findRenderedComponentWithType(renderedComponents, AccessMaskSwitches);
        return accessMaskSwitchesComponent;
    };

    it('should render a toggle component for view and for edit', () => {
        renderComponent({accessMask: '--------'});

        expect(scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle).length).to.equal(2);
    });

    it('should display the passed label', () => {
        renderComponent({accessMask: '--------', label: 'Another awesome group of users'});
        const labelComponent = React.findDOMNode(accessMaskSwitchesComponent).querySelector('div > div');

        expect(labelComponent.textContent).to.equal('Another awesome group of users');
    });

    describe('Toggle for View', () => {
        let viewToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({accessMask: '--------', name: 'accessMaskSwitches'});
            viewToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[0];
        });

        it('should give the toggle the name accessMaskSwitches', () => {
            expect(viewToggleComponent.props.name).to.equal('accessMaskSwitchesView');
        });

        it('should give the toggle the accessMaskSwitches label', () => {
            expect(viewToggleComponent.props.label).to.equal('can_view_translated');
        });

        it('should render the component as not toggled', () => {
            expect(viewToggleComponent.isToggled()).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({accessMask: 'r-------'});
            viewToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[0];

            expect(viewToggleComponent.isToggled()).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({accessMask: '--------', onChange: onChange});
            viewToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[0];
            const inputComponent = React.findDOMNode(viewToggleComponent).querySelector('input');

            Simulate.change(inputComponent);

            expect(onChange).to.be.calledWith('r-------');
        });

        it('should render the view button as toggled and disabled if the edit is there', () => {
            renderComponent({accessMask: 'rw------'});
            viewToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[0];

            expect(viewToggleComponent.isToggled()).to.be.true;
            expect(viewToggleComponent.props.disabled).to.be.true;
        });
    });

    describe('Toggle for Edit', () => {
        let editToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({accessMask: '--------', name: 'accessMaskSwitches'});
            editToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[1];
        });

        it('should give the toggle the name accessMaskSwitchesEdit', () => {
            expect(editToggleComponent.props.name).to.equal('accessMaskSwitchesEdit');
        });

        it('should give the toggle the accessMaskSwitchesEdit label', () => {
            expect(editToggleComponent.props.label).to.equal('can_edit_translated');
        });

        it('should render the component as not toggled', () => {
            expect(editToggleComponent.isToggled()).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({accessMask: 'rw------'});
            editToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[1];

            expect(editToggleComponent.isToggled()).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({accessMask: '--------', onChange: onChange});
            editToggleComponent = scryRenderedComponentsWithType(accessMaskSwitchesComponent, Toggle)[1];
            const inputComponent = React.findDOMNode(editToggleComponent).querySelector('input');

            Simulate.change(inputComponent);

            expect(onChange).to.be.calledWith('rw------');
        });
    });
});
