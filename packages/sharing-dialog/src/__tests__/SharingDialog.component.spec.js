import React from 'react';
import log from 'loglevel';
import { shallow } from 'enzyme';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { LoadingMask } from '@dhis2/d2-ui-core';
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
    let sharingDialogComponent,
        onRequestClose,
        onConfirm;

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
        onConfirm = jest.fn();
        sharingDialogComponent = renderComponent({
            ...sharingDialogProps,
            d2: context.d2,
            onRequestClose,
            onConfirm,
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

        it('renders a single Button', () => {
            sharingDialogComponent.update();
            const button = sharingDialogComponent.find(DialogActions).find(Button);

            expect(button.length).toBe(1);
            expect(button.type()).toBe(Button);
        });

        it('renders "close" text on Button', () => {
            sharingDialogComponent.update();
            const button = sharingDialogComponent.find(DialogActions).find(Button);

            expect(button.childAt(0).text()).toBe('close_translated');
        });

        it('triggers onRequestClose from the props when the closeDialog is called', () => {
            sharingDialogComponent.instance().closeDialog();
            expect(onRequestClose).toHaveBeenCalledTimes(1);
        });

        it('triggers onConfirm from the props when the confirmAndCloseDialog is called', () => {
            sharingDialogComponent.instance().confirmAndCloseDialog();
            expect(onConfirm).toHaveBeenCalledTimes(1);
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
