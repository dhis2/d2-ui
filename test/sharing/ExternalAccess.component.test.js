import React from 'react/addons';
import injectTheme from '../../config/inject-theme';
import ExternalAccess from '../../src/sharing/ExternalAccess.component';
import Toggle from 'material-ui/lib/toggle';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
    Simulate,
} = React.addons.TestUtils;

xdescribe('Sharing: ExternalAccess component', () => {
    let externalAccessComponent;

    const renderComponent = (props = {}) => {
        const ExternalAccessWithContext = injectTheme(ExternalAccess);
        const renderedComponents = renderIntoDocument(<ExternalAccessWithContext {...props} />);

        externalAccessComponent = findRenderedComponentWithType(renderedComponents, ExternalAccess);
        return externalAccessComponent;
    };

    it('should render a toggle component', () => {
        renderComponent({externalAccess: false});

        expect(() => findRenderedComponentWithType(externalAccessComponent, Toggle)).not.to.throw();
    });

    describe('Toggle', () => {
        let toggleComponent;
        let onChange;

        beforeEach(() => {
            onChange = spy();
            renderComponent({externalAccess: false});
            toggleComponent = findRenderedComponentWithType(externalAccessComponent, Toggle);
        });

        it('should give the toggle the name externalAccess', () => {
            expect(toggleComponent.props.name).to.equal('externalAccess');
        });

        it('should give the toggle the externalAccess label', () => {
            expect(toggleComponent.props.label).to.equal('external_access_translated');
        });

        it('should render the component as not toggled', () => {
            expect(toggleComponent.isToggled()).to.be.false;
        });

        it('should render the component as toggled', () => {
            renderComponent({externalAccess: true});
            toggleComponent = findRenderedComponentWithType(externalAccessComponent, Toggle);

            expect(toggleComponent.isToggled()).to.be.true;
        });

        it('should call the change method when the toggle is clicked', () => {
            renderComponent({externalAccess: false, onChange: onChange});
            toggleComponent = findRenderedComponentWithType(externalAccessComponent, Toggle);
            const inputComponent = React.findDOMNode(toggleComponent).querySelector('input');

            Simulate.change(inputComponent);

            expect(onChange).to.be.called;
        });

        it('should set the toggle to be disabled', () => {
            renderComponent({externalAccess: false, disabled: true});
            toggleComponent = findRenderedComponentWithType(externalAccessComponent, Toggle);

            expect(toggleComponent.props.disabled).to.be.true;
        });
    });
});
