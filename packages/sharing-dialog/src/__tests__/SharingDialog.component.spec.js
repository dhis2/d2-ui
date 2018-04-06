import React from 'react';
import log from 'loglevel';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { LoadingMask } from 'd2-ui';
import SharingDialog from '../SharingDialog.component';
import Sharing from '../Sharing.component';

import { getStubContext } from '../../../../config/inject-theme';

const mockedObject = {
    sharedObject: {
        meta: {
            allowPublicAccess: true,
            allowExternalAccess: false,
        },
        object: {
            id: 'veGzholzPQm',
            name: 'HIV age',
            displayName: 'HIV age',
            publicAccess: 'rw------',
            externalAccess: false,
            user: {
                id: 'GOLswS44mh8',
                name: 'Tom Wakiki',
            },
            userGroupAccesses: [{
                id: 'Rg8wusV7QYi',
                name: 'HIV Program Coordinators',
                displayName: 'HIV Program Coordinators',
                access: 'rw------'}
            ],
            userAccesses: [{
                id: 'N3PZBUlN8vq',
                name: 'John Kamara',
                displayName: 'John Kamara',
                access: 'r-------',
            }],
        },
    },
    dataShareable: false,
    onChange: () => {},
    onSearch: () => {},
};

const sharingDialogProps = {
    open: true,
    type: 'report',
    id: 'AMERNML55Tg',
};

describe('Sharing: SharingDialog component', () => {
    let sharingDialogComponent;
    let onRequestClose;
    const context = getStubContext();

    context.d2.Api.getApi = jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue(Promise.resolve({ schemas: [] })),
    });

    const renderComponent = (props = {}) =>
        shallow(<SharingDialog {...props} />, {
            context,
        });

    beforeEach(() => {
        onRequestClose = jest.fn();
        sharingDialogComponent = renderComponent({
            ...sharingDialogProps,
            d2: context.d2,
            onRequestClose,
        });
    });

    it('should show its dialog when objectToShare is defined', () => {
        sharingDialogComponent.setState({
            sharedObject: mockedObject,
        });

        expect(sharingDialogComponent.find(Sharing)).toHaveLength(1);
    });

    describe('when state contains a shared object', () => {
        beforeEach(() => {
            sharingDialogComponent.instance().setState({
                sharedObject: mockedObject,
            });
        });

        it('renders a single FlatButton', () => {
            sharingDialogComponent.update();

            const buttons = sharingDialogComponent.find(Dialog).first().prop('actions');

            expect(buttons.length).toBe(1);
            expect(buttons[0].type).toBe(FlatButton);
        });

        it('renders "close" text on FlatButton', () => {
            sharingDialogComponent.update();
            const buttons = sharingDialogComponent.find(Dialog).first().prop('actions');

            expect(buttons[0].props.label).toBe('close_translated');
        });

        it('triggers onRequestClose from the props when the closeSharingDialog is called', () => {
            sharingDialogComponent.instance().closeSharingDialog();
            expect(onRequestClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('when no sharedObject is defined and dialog is open', () => {
        beforeEach(() => {
            jest.fn(log, 'warn');
        });

        it('renders a LoadingMask', () => {
            expect(sharingDialogComponent.find(LoadingMask)).toHaveLength(1);
        });
    });
});
