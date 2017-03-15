/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

import React from 'react';
import log from 'loglevel';
import { shallow } from 'enzyme';

import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SharingDialog from '../../src/sharing/SharingDialog.component';
import LoadingMask from '../../src/loading-mask/LoadingMask.component';
import Sharing from '../../src/sharing/Sharing.component';

import { getStubContext } from '../../config/inject-theme';

const mockedObject = {
    authorOfSharableItem: {
        id: 'GOLswS44mh8',
        name: 'Tom Wakiki',
    },
    nameOfSharableItem: 'ANC: Overview Report (HTML-based)',
    canSetPublicAccess: true,
    canSetExternalAccess: true,
    publicCanView: true,
    publicCanEdit: true,
    isSharedExternally: true,
    accesses: [{
        id: 'lFHP5lLkzVr',
        name: 'System administrators',
        displayName: 'System administrators',
        type: 'userGroup',
        canView: true,
        canEdit: false,
    }, {
        id: 'rWLrZL8rP3K',
        name: 'Guest User',
        displayName: 'Guest User',
        type: 'user',
        canView: true,
        canEdit: false,
    }],
};

describe('Sharing: SharingDialog component', () => {
    let sharingDialogComponent;
    let onRequestClose;

    const renderComponent = (props = {}) =>
        shallow(<SharingDialog {...props} />, {
            context: getStubContext(),
        });

    beforeEach(() => {
        onRequestClose = sinon.spy();

        sharingDialogComponent = renderComponent({
            open: true,
            onRequestClose,
            type: 'report',
            id: 'AMERNML55Tg',
        });
    });

    sinon.stub(SharingDialog.prototype, 'loadObjectFromApi');

    it('should show its dialog when objectToShare is defined', () => {
        sinon.stub(SharingDialog.prototype, 'onSharingChanged');
        sinon.stub(SharingDialog.prototype, 'onSearchRequest');

        sharingDialogComponent.setState({
            api: null,
            objectToShare: mockedObject,
            fullObjectName: mockedObject.name,
        });

        expect(sharingDialogComponent.find(Sharing)).to.have.length(1);
    });

    describe('close action', () => {
        beforeEach(() => {
            sharingDialogComponent.setState({
                api: null,
                objectToShare: mockedObject,
                fullObjectName: mockedObject.name,
            });
        });

        it('should render the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;
            expect(buttons.length).to.equal(1);
            expect(buttons[0].type).to.equal(FlatButton);
        });

        it('should pass the close label to the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;
            expect(buttons[0].props.label).to.equal('close_translated');
        });

        it('should call onRequestClose from the props when the closeSharingDialog is called', () => {
            sharingDialogComponent.setState({
                apiObject: {
                    object: null,
                },
            });

            sharingDialogComponent.instance().closeSharingDialog();
            expect(onRequestClose).to.be.calledOnce;
        });
    });

    describe('loadingMask', () => {
        beforeEach(() => {
            sinon.stub(log, 'warn');
        });

        it('should render when objectToShare is undefined', () => {
            renderComponent({ open: true, onRequestClose: () => {}, type: 'report', id: 'AMERNML55Tg' });
            expect(sharingDialogComponent.find(LoadingMask)).to.have.length(1);
        });
    });
});
