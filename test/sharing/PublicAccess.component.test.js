import React from 'react/addons';
import injectTheme from '../config/inject-theme';
import PublicAccess from '../../src/sharing/PublicAccess.component';
import Toggle from 'material-ui/lib/toggle';

const {
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    renderIntoDocument,
    Simulate,
} = React.addons.TestUtils;

describe('Sharing: PublicAccess component', () => {
    let publicAccessComponent;

    const renderComponent = (props = {}) => {
        const PublicAccessWithContext = injectTheme(PublicAccess);
        const renderedComponents = renderIntoDocument(<PublicAccessWithContext {...props} />);

        publicAccessComponent = findRenderedComponentWithType(renderedComponents, PublicAccess);
        return publicAccessComponent;
    };

    it('should render a toggle component for view and for edit', () => {
        renderComponent({publicAccess: '--------'});

        expect(scryRenderedComponentsWithType(publicAccessComponent, Toggle).length).to.equal(2);
    });

    it('should render a AccessMAskSwitches component', () => {
        renderComponent({
            publicAccess: '--------',
        });

        expect(scryRenderedComponentsWithType(publicAccessComponent, Toggle).length).to.equal(2);
    });

    describe('Toggle for View', () => {
        let viewToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({publicAccess: '--------'});
            viewToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[0];
        });

        it('should give the toggle the name publicAccess', () => {
            expect(viewToggleComponent.props.name).to.equal('publicAccessView');
        });

        it('should give the toggle the publicAccess label', () => {
            expect(viewToggleComponent.props.label).to.equal('can_view_translated');
        });

        it('should render the component as not toggled', () => {
            expect(viewToggleComponent.isToggled()).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({publicAccess: 'r-------'});
            viewToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[0];

            expect(viewToggleComponent.isToggled()).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({publicAccess: '--------', onChange: onChange});
            viewToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[0];
            const inputComponent = React.findDOMNode(viewToggleComponent).querySelector('input');

            Simulate.change(inputComponent);

            expect(onChange).to.be.calledWith('r-------');
        });

        it('should render the view button as toggled and disabled if the edit is there', () => {
            renderComponent({publicAccess: 'rw------'});
            viewToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[0];

            expect(viewToggleComponent.isToggled()).to.be.true;
            expect(viewToggleComponent.props.disabled).to.be.true;
        });

        it('should set the toggle to disabled when disabled is passed', () => {
            renderComponent({publicAccess: 'rw------', disabled: true});
            viewToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[0];

            expect(viewToggleComponent.props.disabled).to.be.true;
        });
    });

    describe('Toggle for Edit', () => {
        let editToggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({publicAccess: '--------'});
            editToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[1];
        });

        it('should give the toggle the name publicAccessEdit', () => {
            expect(editToggleComponent.props.name).to.equal('publicAccessEdit');
        });

        it('should give the toggle the publicAccessEdit label', () => {
            expect(editToggleComponent.props.label).to.equal('can_edit_translated');
        });

        it('should render the component as not toggled', () => {
            expect(editToggleComponent.isToggled()).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({publicAccess: 'rw------'});
            editToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[1];

            expect(editToggleComponent.isToggled()).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({publicAccess: '--------', onChange: onChange});
            editToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[1];
            const inputComponent = React.findDOMNode(editToggleComponent).querySelector('input');

            Simulate.change(inputComponent);

            expect(onChange).to.be.calledWith('rw------');
        });

        it('should set the toggle to disabled when disabled is passed', () => {
            renderComponent({publicAccess: 'rw------', disabled: true});
            editToggleComponent = scryRenderedComponentsWithType(publicAccessComponent, Toggle)[1];

            expect(editToggleComponent.props.disabled).to.be.true;
        });
    });
});
