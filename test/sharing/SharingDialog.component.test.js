import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import React from 'react/addons';
import SharingDialog from '../../src/sharing/SharingDialog.component';
import Sharing from '../../src/sharing/Sharing.component';
import injectTheme from '../config/inject-theme';

const {
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    renderIntoDocument,
} = React.addons.TestUtils;

describe('Sharing: SharingDialog component', () => {
    let sharingDialogComponent;
    let objectToShare;
    const renderComponent = (props = {}) => {
        const SharingWithContext = injectTheme(SharingDialog);
        const renderedComponents = renderIntoDocument(<SharingWithContext {...props} />);

        sharingDialogComponent = findRenderedComponentWithType(renderedComponents, SharingDialog);
        return sharingDialogComponent;
    };

    beforeEach(() => {
        objectToShare = {
            name: 'ANC Care',
        };

        renderComponent({
            objectToShare,
            openImmediately: true,
        });
    });

    it('should render a Dialog element', () => {
        expect(() => findRenderedComponentWithType(sharingDialogComponent, Dialog)).not.to.throw();
    });

    it('should render the dialog title as as the translated text `sharing_settings_translated`', () => {
        const dialogComponent = findRenderedComponentWithType(sharingDialogComponent, Dialog);

        expect(dialogComponent.props.title).to.equal(`sharing_settings_translated`);
    });

    it('should render the close button', () => {
        const dialogComponent = findRenderedComponentWithType(sharingDialogComponent, Dialog);
        const buttons = scryRenderedComponentsWithType(dialogComponent, FlatButton);

        expect(buttons.length).to.equal(1);
    });

    it('should not render the dialog as a modal', () => {
        const dialogComponent = findRenderedComponentWithType(sharingDialogComponent, Dialog);

        expect(dialogComponent.props.modal).to.be.false;
    });

    it('should pass down the props that are passed to Sharing to the Dialog', () => {
        const dialogComponent = findRenderedComponentWithType(sharingDialogComponent, Dialog);

        expect(dialogComponent.props.openImmediately).to.be.true;
    });

    describe('Sharing component', () => {
        it('should be rendered as part of the dialog', () => {
            expect(() => findRenderedComponentWithType(sharingDialogComponent, Sharing)).not.to.throw();
        });

        it('should pass the object to share to the Sharing component', () => {
            expect(() => findRenderedComponentWithType(sharingDialogComponent, Sharing)).not.to.throw();
        });
    });
});
