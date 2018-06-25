import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

export default class SharingExample extends React.Component {
    state = {
        open: false,
        sharingDialogProps: {
            id: '',
            type: '',
        },
    }

    getChildContext = () => ({
        d2: {
            i18n: {
                getTranslation(key) {
                    return key;
                },
            },
        },
    });

    createOpenHandler = (sharingDialogProps) => () => {
        this.setState({
            open: true,
            sharingDialogProps,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleConfirm = updatedSharing => {
        console.log('Updated sharing settings:', updatedSharing);
        this.handleClose();
    };

    render = () => (
        <div style={{ paddingLeft: '16px' }}>
            <SharingDialog
                open={this.state.open}
                d2={this.props.d2}
                onRequestClose={this.handleClose}
                {...this.state.sharingDialogProps}
            />

            <Description text="Independent metadata sharing" />
            <RaisedButton label="category/veGzholzPQm" onClick={this.createOpenHandler({
                type: "category",
                id: "veGzholzPQm"
            })} />

            <Description text="Independent metadata and data sharing" />
            <RaisedButton label="categoryOption/K4gwuiVvW3z" onClick={this.createOpenHandler({
                type: "categoryOption",
                id: "K4gwuiVvW3z",
            })} />

            <Description text="With 'doNotPost' and 'onConfirm' props. Useful when you want the app to save the sharing settings themselves." />
            <RaisedButton label="categoryOption/K4gwuiVvW3z" onClick={this.createOpenHandler({
                type: "categoryOption",
                id: "K4gwuiVvW3z",
                doNotPost: true,
                onConfirm: this.handleConfirm,
            })} />

            <Description text="With 'sharedObject' prop. Useful if you want to supply default sharing settings." />
            <RaisedButton label="categoryOption/K4gwuiVvW3z" onClick={this.createOpenHandler({
                type: "categoryOption",
                id: "K4gwuiVvW3z",
                sharedObject: {
                    object: {
                        user: { id: "123", name: "Somebody" },
                        displayName: "Some fancy object to share",
                        userAccesses: [],
                        userGroupAccesses: [],
                        publicAccess: 'rw------',
                        externalAccess: true,
                    },
                    meta: {
                        allowPublicAccess: true,
                        allowExternalAccess: false,
                    }
                },
            })} />

            <Description text="With 'doNotPost', 'onConfirm' and 'sharedObject' props. Useful if you want complete control over the shared object, e.g. if it doesn't exist yet." />
            <RaisedButton label="categoryOption/K4gwuiVvW3z" onClick={this.createOpenHandler({
                type: "categoryOption",
                id: "K4gwuiVvW3z",
                doNotPost: true,
                onConfirm: this.handleConfirm,
                sharedObject: {
                    object: {
                        user: { id: "123", name: "Somebody" },
                        displayName: "Object that may not yet exist",
                        userAccesses: [],
                        userGroupAccesses: [],
                        publicAccess: '--------',
                        externalAccess: false,
                    },
                    meta: {
                        allowPublicAccess: true,
                        allowExternalAccess: false,
                    }
                },
            })} />
        </div>
    )
}

const Description = ({ text }) => (
    <div style={{
        paddingTop: '16px',
        paddingBottom: '16px',
    }}>
        {text}
    </div>
);

SharingExample.childContextTypes = {
    d2: PropTypes.object,
};
