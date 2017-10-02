/* eslint no-console: 0 */

import { config, getInstance } from 'd2/lib/d2';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import Sharing from './Sharing.component';
import LoadingMask from '../loading-mask/LoadingMask.component';

config.i18n.strings.add('share');
config.i18n.strings.add('close');
config.i18n.strings.add('no_manage_access');

function cachedAccessTypeToString(canView, canEdit) {
    if (canView) {
        return canEdit
            ? 'rw------'
            : 'r-------';
    }

    return '--------';
}

function transformAccessObject(access, type) {
    return {
        id: access.id,
        name: access.name,
        displayName: access.displayName,
        type,
        canView: access.access && access.access.includes('r'),
        canEdit: access.access && access.access.includes('rw'),
    };
}

function transformObjectStructure(apiMeta, apiObject) {
    const userGroupAccesses = !apiObject.userGroupAccesses ? [] : apiObject.userGroupAccesses.map(
        access => transformAccessObject(access, 'userGroup'));

    const userAccesses = !apiObject.userAccesses ? [] : apiObject.userAccesses.map(
        access => transformAccessObject(access, 'user'));

    const combinedAccesses = userGroupAccesses.concat(userAccesses);
    const authorOfSharableItem = apiObject.user && {
        id: apiObject.user.id,
        name: apiObject.user.name,
    };

    return {
        authorOfSharableItem,
        nameOfSharableItem: apiObject.name,
        canSetPublicAccess: apiMeta.allowPublicAccess,
        canSetExternalAccess: apiMeta.allowExternalAccess,
        publicCanView: apiObject.publicAccess.includes('r'),
        publicCanEdit: apiObject.publicAccess.includes('rw'),
        isSharedExternally: apiObject.externalAccess,
        accesses: combinedAccesses,
    };
}

/**
 * A pop-up dialog for changing sharing preferences for a sharable object.
 */
class SharingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessForbidden: false,
            apiObject: null,
            objectToShare: null,
        };

        if (this.props.open) {
            this.loadObjectFromApi();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.setState({
                accessForbidden: false,
                objectToShare: null,
            });

            if (nextProps.open) this.loadObjectFromApi();
        }

        if (!this.props.open && nextProps.open) {
            this.loadObjectFromApi();
        }
    }

    onSearchRequest = (searchText) => {
        const apiInstance = this.state.api;

        return apiInstance.get('sharing/search', { key: searchText })
            .then((searchResult) => {
                const transformedResult = searchResult.users.map(
                    user => transformAccessObject(user, 'user'));

                return transformedResult.concat(
                    searchResult.userGroups.map(
                        userGroup => transformAccessObject(userGroup, 'userGroup')));
            });
    }

    onSharingChanged = (updatedAttributes, onSuccess) => {
        const objectToShare = {
            ...this.state.objectToShare,
            ...updatedAttributes,
        };

        const apiObject = this.restoreObjectStructure(objectToShare);

        return this.state.api.post(`sharing?type=${this.props.type}&id=${this.props.id}`, apiObject)
            .then(({ httpStatus, message }) => {
                if (httpStatus === 'OK') {
                    this.setState({
                        objectToShare,
                        apiObject,
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

    loadObjectFromApi() {
        getInstance().then((d2) => {
            const apiInstance = d2.Api.getApi();
            apiInstance.get('sharing', { type: this.props.type, id: this.props.id })
                .then((apiObject) => {
                    this.setState({
                        api: apiInstance,
                        apiObject,
                        objectToShare: transformObjectStructure(apiObject.meta, apiObject.object),
                    });
                })
                .catch(() => {
                    this.setState({
                        accessForbidden: true,
                    });
                });
        });
    }

    restoreObjectStructure(transformedObject) {
        const userAccesses = [];
        const userGroupAccesses = [];

        transformedObject.accesses.forEach((access) => {
            const apiAccess = {
                id: access.id,
                name: access.name,
                displayName: access.name,
                access: cachedAccessTypeToString(access.canView, access.canEdit),
            };

            if (access.type === 'user') {
                userAccesses.push(apiAccess);
            } else {
                userGroupAccesses.push(apiAccess);
            }
        });

        return {
            meta: this.state.apiObject.meta,
            object: {
                ...this.state.apiObject.object,
                userAccesses,
                userGroupAccesses,

                publicAccess: cachedAccessTypeToString(
                    transformedObject.publicCanView,
                    transformedObject.publicCanEdit,
                ),
                externalAccess: transformedObject.isSharedExternally,
            },
        };
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

        const loadingMaskStyle = {
            position: 'relative',
        };

        if (!this.state.objectToShare) {
            if (this.state.accessForbidden) {
                return (
                    <Snackbar
                        open
                        message={this.context.d2.i18n.getTranslation('no_manage_access')}
                        autoHideDuration={3000}
                    />
                );
            }

            if (this.props.open) {
                return (<LoadingMask style={loadingMaskStyle} size={1} />);
            }

            return null;
        }

        return (
            <Dialog
                open={this.props.open}
                title={this.context.d2.i18n.getTranslation('share')}
                actions={sharingDialogActions}
                autoDetectWindowHeight
                autoScrollBodyContent
                onRequestClose={this.closeSharingDialog}
                {...this.props}
            >
                <Sharing
                    authorOfSharableItem={this.state.objectToShare.authorOfSharableItem}
                    nameOfSharableItem={this.state.objectToShare.nameOfSharableItem}
                    canSetPublicAccess={this.state.objectToShare.canSetPublicAccess}
                    canSetExternalAccess={this.state.objectToShare.canSetExternalAccess}
                    publicCanView={this.state.objectToShare.publicCanView}
                    publicCanEdit={this.state.objectToShare.publicCanEdit}
                    isSharedExternally={this.state.objectToShare.isSharedExternally}
                    accesses={this.state.objectToShare.accesses}
                    onSharingChanged={this.onSharingChanged}
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
