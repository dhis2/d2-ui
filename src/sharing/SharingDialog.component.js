/* eslint no-console: 0 */

import { config, getInstance } from 'd2/lib/d2';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import Sharing from './Sharing.component';
import LoadingMask from '../loading-mask/LoadingMask.component';
import { transformAccessObject } from './utils';

config.i18n.strings.add('share');
config.i18n.strings.add('close');
config.i18n.strings.add('no_manage_access');

const styles = {
    loadingMask: {
        position: 'relative',
    },
};

const defaultState = {
    accessForbidden: false,
    dataShareableTypes: [],
    sharedObject: null,
}

/**
 * A pop-up dialog for changing sharing preferences for a sharable object.
 */
class SharingDialog extends React.Component {
    state = defaultState;

    componentDidMount() {
        this.loadDataSharingSettings();
        if (this.props.open) {
            this.loadObjectFromApi();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.resetState();
            if (nextProps.open) this.loadObjectFromApi();
        }

        if (!this.props.open && nextProps.open) {
            this.loadObjectFromApi();
        }
    }

    onSearchRequest = key =>
        this.state.api.get('sharing/search', { key })
            .then(searchResult => searchResult);

    onSharingChanged = (updatedAttributes, onSuccess) => {
        const updatedObject = {
            meta: this.state.sharedObject.meta,
            object: {
                ...this.state.sharedObject.object,
                ...updatedAttributes,
            },
        };

        this.postChanges(updatedObject);        
    }

    postChanges = (updatedObject, onSuccess) => {
        const url = `sharing?type=${this.props.type}&id=${this.props.id}`;
        return this.state.api.post(url, updatedObject)
            .then(({ httpStatus, message }) => {
                if (httpStatus === 'OK') {
                    this.setState({
                        sharedObject: updatedObject,
                    }, () => {
                        if (onSuccess) onSuccess();
                    });
                } else {
                    console.warn('Failed to post changes.');
                    console.warn('SERVER SAID:', message);
                }

                return message;
            })
            .catch(({ message }) => {
                console.warn('Failed to post changes.');
                console.warn('SERVER SAID:', message);
            });
    }

    resetState = () => {
        this.setState(defaultState);
    }

    loadDataSharingSettings = () => {
        getInstance().then(d2 => {
            const api = d2.Api.getApi();
            
            api.get('schemas', { fields: ['name', 'dataShareable'] })
                .then(schemas => {
                    const dataShareableTypes = schemas.schemas
                        .filter(item => item.dataShareable)
                        .map(item => item.name);

                    this.setState({
                        dataShareableTypes,
                    });
                });
        });
    }

    loadObjectFromApi = () => {
        getInstance().then(d2 => {
            const api = d2.Api.getApi();
            const { type, id } = this.props;

            api.get('sharing', { type, id })
                .then(sharedObject => {
                    this.setState({
                        api,
                        sharedObject,
                    });
                })
                .catch(error => {
                    this.setState({
                        accessForbidden: true,
                    });
                });
        });
    }

    closeSharingDialog = () => {
        this.props.onRequestClose(this.state.apiObject.object);
    }

    render() {
        const sharingDialogActions = [
            <FlatButton
                label={this.context.d2.i18n.getTranslation('close')}
                onClick={this.closeSharingDialog}
            />,
        ];

        if (!this.state.sharedObject) {
            if (this.state.accessForbidden) {
                return (
                    <Snackbar
                        open
                        autoHideDuration={3000}
                        message={this.context.d2.i18n.getTranslation('no_manage_access')}
                    />
                );
            }

            return this.props.open
                ? <LoadingMask style={styles.loadingMask} size={1} />
                : null;
        }

        const dataShareable = this.state.dataShareableTypes.indexOf(this.props.type) !== -1;

        return (
            <Dialog
                autoDetectWindowHeight
                autoScrollBodyContent
                open={this.props.open}
                title={this.context.d2.i18n.getTranslation('share')}
                actions={sharingDialogActions}
                onRequestClose={this.closeSharingDialog}
                {...this.props}
            >
                <Sharing
                    sharedObject={this.state.sharedObject}
                    dataShareable={dataShareable}
                    onChange={this.onSharingChanged}
                    onSearch={this.onSearchRequest}
                />
            </Dialog>
        );
    }
}

SharingDialog.propTypes = {
    /**
     * Decides whether the dialog should be open or closed.
     */
    open: PropTypes.bool.isRequired,

    /**
     * Function to be called when the dialog is closed. The function is called
     * with the updated sharing preferences as the first and only argument.
     */
    onRequestClose: PropTypes.func.isRequired,

    /**
     * Type of the sharable object.
     */
    type: PropTypes.string.isRequired,

    /**
     * Id of the sharable object.
     */
    id: PropTypes.string.isRequired,
};

SharingDialog.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default SharingDialog;
