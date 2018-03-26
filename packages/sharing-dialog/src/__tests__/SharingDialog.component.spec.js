import React from 'react';
import log from 'loglevel';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SharingDialog from '../SharingDialog.component';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
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
    let context = getStubContext();

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

    describe('close action', () => {
        beforeEach(() => {
            sharingDialogComponent.instance().setState({
                sharedObject: mockedObject,
            });
        });

        it('should render the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;
            expect(buttons.length).toBe(1);
            expect(buttons[0].type).toBe(FlatButton);
        });

        it('should pass the close label to the close button', () => {
            const buttons = sharingDialogComponent.find(Dialog).props().actions;
            expect(buttons[0].props.label).toBe('close_translated');
        });

        it('should call onRequestClose from the props when the closeSharingDialog is called', () => {
            sharingDialogComponent.instance().closeSharingDialog();
            expect(onRequestClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('loadingMask', () => {
        beforeEach(() => {
            jest.fn(log, 'warn');
        });

        it('should render when sharedObject is undefined and dialog is open', () => {
            renderComponent({...sharingDialogProps, d2: context.d2});
            expect(sharingDialogComponent.find(LoadingMask)).toHaveLength(1);
        });
    });
});
