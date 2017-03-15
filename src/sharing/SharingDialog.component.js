/* eslint no-console: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint no-unused-expressions: 0 */

import { config, getInstance } from 'd2/lib/d2';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import React, { PropTypes } from 'react';
import Sharing from './Sharing.component';
import LoadingMask from '../loading-mask/LoadingMask.component';

config.i18n.strings.add('share');
config.i18n.strings.add('close');

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

    return {
        ...apiObject.user && {
            authorOfSharableItem: {
                id: apiObject.user.id,
                name: apiObject.user.name,
            },
        },
        nameOfSharableItem: apiObject.name,
        canSetPublicAccess: apiMeta.allowPublicAccess,
        canSetExternalAccess: apiMeta.allowExternalAccess,
        publicCanView: apiObject.publicAccess.includes('r'),
        publicCanEdit: apiObject.publicAccess.includes('rw'),
        isSharedExternally: apiObject.externalAccess,
        accesses: combinedAccesses,
    };
}

class SharingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiObject: null,
            objectToShare: null,
        };

        this.loadObjectFromApi();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.setState({
                objectToShare: null,
            });

            this.loadObjectFromApi();
        }
    }

    onSearchRequest(searchText) {
        const apiInstance = this.state.api;

        return apiInstance.get('sharing/search', { key: searchText })
            .then((searchResult) => {
                let transformedResult = searchResult.users.map(
                    user => transformAccessObject(user, 'user'));

                transformedResult = transformedResult.concat(
                    searchResult.userGroups.map(
                        userGroup => transformAccessObject(userGroup, 'userGroup')));

                return transformedResult;
            });
    }

    onSharingChanged(updatedAttributes, onSuccess) {
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
                      onSuccess && onSuccess();
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
                });
        });
    }

    restoreObjectStructure(transformedObject) {
        const userAccesses = [];
        const userGroupAccesses = [];

        // eslint-disable-next-line array-callback-return
        transformedObject.accesses.map((access) => {
            const apiAccess = {
                id: access.id,
                name: access.name,
                displayName: access.name,
                access: cachedAccessTypeToString(access.canView, access.canEdit),
            };

            access.type === 'user'
                ? userAccesses.push(apiAccess)
                : userGroupAccesses.push(apiAccess);
        });

        return {
            meta: this.state.apiObject.meta,
            object: {
                ...this.state.apiObject.object,
                ...userAccesses && { userAccesses },
                ...userGroupAccesses && { userGroupAccesses },

                publicAccess: cachedAccessTypeToString(
                    transformedObject.publicCanView,
                    transformedObject.publicCanEdit
                ),
                externalAccess: transformedObject.isSharedExternally,
            },
        };
    }

    closeSharingDialog() {
        this.props.onRequestClose(this.state.apiObject.object);
    }

    render() {
        const sharingDialogActions = [
            <FlatButton
                label={this.context.d2.i18n.getTranslation('close')}
                onClick={this.closeSharingDialog.bind(this)}
            />,
        ];

        const loadingMaskStyle = {
            position: 'relative',
        };

        return this.state.objectToShare ? (
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
                    onSharingChanged={this.onSharingChanged.bind(this)}
                    onSearch={this.onSearchRequest.bind(this)}
                />
            </Dialog>
        ) : <LoadingMask style={loadingMaskStyle} size={1} />;
    }
}

SharingDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

SharingDialog.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default SharingDialog;
