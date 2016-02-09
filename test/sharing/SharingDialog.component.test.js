import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import React from 'react';
import SharingDialog from '../../src/sharing/SharingDialog.component';
import Sharing from '../../src/sharing/Sharing.component';
import {getStubContext} from '../../config/inject-theme';
import {shallow} from 'enzyme';

describe('Sharing: SharingDialog component', () => {
    let sharingDialogComponent;
    let objectToShare;
    const renderComponent = (props = {}) => {
        return shallow(<SharingDialog {...props} />, {
            context: getStubContext(),
        });
    };

    beforeEach(() => {
        objectToShare = {
            name: 'ANC Care',
        };

        sharingDialogComponent = renderComponent({
            objectToShare,
            openImmediately: true,
        });
    });

    it('should render a Dialog element', () => {
        expect(sharingDialogComponent.find(Dialog)).to.have.length(1);
    });

    it('should render the dialog title as as the translated text `sharing_settings_translated`', () => {
        expect(sharingDialogComponent.find(Dialog).props().title).to.equal(`sharing_settings_translated`);
    });

    it('should not render the dialog as a modal', () => {
        const dialogComponent = sharingDialogComponent.find(Dialog);

        expect(dialogComponent.props().modal).to.be.false;
    });

    it('should pass down the props that are passed to Sharing to the Dialog', () => {
        const dialogComponent = sharingDialogComponent.find(Dialog);

        expect(dialogComponent.props().openImmediately).to.be.true;
    });

    it('should pass the correct `ref` to the Dialog ', () => {
        const dialogComponent = sharingDialogComponent.find(Dialog);

        expect(dialogComponent.node.ref).to.equal('sharingDialog');
    });

    describe('Sharing component', () => {
        it('should be rendered as part of the dialog', () => {
            expect(sharingDialogComponent.find(Sharing)).to.have.length(1);
        });

        it('should pass the object to share to the Sharing component', () => {
            const sharingComponent = sharingDialogComponent.find(Sharing);

            expect(sharingComponent.props().objectToShare).not.to.be.undefined;
            expect(sharingDialogComponent.props().objectToShare).to.deep.equal(sharingComponent.props().objectToShare);
        });
    });

    describe('close action', () => {
        it('should render the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;

            expect(buttons.length).to.equal(1);
            expect(buttons[0].type).to.equal(FlatButton);
        });

        it('should pass the close label to the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;

            expect(buttons[0].props.label).to.equal('close_translated');
        });

        it('should pass the closeSharingDialog as the onClick handler', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;

            expect(buttons[0].props.onClick).to.equal(sharingDialogComponent.instance().closeSharingDialog);
        });

        it('should call dismiss on the sharingDialog', () => {
            const dialogDismissSpy = spy();
            sharingDialogComponent.instance().refs = {
                sharingDialog: {
                    dismiss: dialogDismissSpy,
                },
            };

            sharingDialogComponent.instance().closeSharingDialog();

            expect(dialogDismissSpy).to.be.calledOnce;
        });
    });
});
