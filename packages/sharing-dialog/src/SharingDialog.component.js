import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import Sharing from './Sharing.component';
import { LoadingMask } from '@dhis2/d2-ui-core';

const styles = {
    loadingMask: {
        position: 'relative',
    },
};

const defaultState = {
    sharedObject: null,
    errorMessage: '',
};

/**
 * A pop-up dialog for changing sharing preferences for a sharable object.
 */
class SharingDialog extends React.Component {
    state = {
        ...defaultState,
        dataShareableTypes: [],
    };

    constructor(props) {
        super(props);
        if (props.d2) {
            props.d2.i18n.addStrings(['share', 'close', 'no_manage_access']);
        } else {
            console.error('no d2');
        }
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    componentDidMount() {
        this.loadDataSharingSettings();

        /* Load object if:
         *   - Dialog is open
         *   - Type and ID is supplied
         *   - User did not supply their own shared object
         */
        if (this.props.open && this.isReadyToLoadObject(this.props)) {
            this.loadObjectFromApi(this.props);
        }
    }

    isReadyToLoadObject = (props) => {
        return props.type && (props.id || props.sharedObject);
    }

    componentWillReceiveProps(nextProps) {
        const hasChanged = this.createPropsChecker(nextProps);

        if ((hasChanged('id') || hasChanged('type') || hasChanged('sharedObject')) && this.isReadyToLoadObject(nextProps)) {
            this.resetState();

            if (nextProps.open) {
                this.loadObjectFromApi(nextProps);
            }
        }

        if (!this.props.open && nextProps.open && this.isReadyToLoadObject(nextProps)) {
            this.loadObjectFromApi(nextProps);
        }
    }

    onSearchRequest = key =>
        this.props.d2.Api.getApi()
            .get('sharing/search', { key })
            .then(searchResult => searchResult);

    onSharingChanged = (updatedAttributes, onSuccess) => {
        const updatedObject = {
            meta: this.state.sharedObject.meta,
            object: {
                ...this.state.sharedObject.object,
                ...updatedAttributes,
            },
        };

        if (this.props.doNotPost) {
            this.updateSharedObject(updatedObject, onSuccess);
        } else {
            this.postChanges(updatedObject, onSuccess);
        }
    }

    createPropsChecker = nextProps => field => nextProps[field] !== this.props[field];

    postChanges = (updatedObject, onSuccess) => {
        const url = `sharing?type=${this.props.type}&id=${this.props.id}`;
        return this.props.d2.Api.getApi()
            .post(url, updatedObject)
            .then(({ httpStatus, message }) => {
                if (httpStatus === 'OK') {
                    this.updateSharedObject(updatedObject, onSuccess);
                }

                return message;
            }).catch(({ message }) => {
                this.setState({
                    errorMessage: message,
                });
            });
    }

    updateSharedObject = (updatedObject, onSuccess) => {
        this.setState({
            sharedObject: updatedObject,
        }, () => {
            if (onSuccess) onSuccess();
        });
    }

    resetState = () => {
        this.setState(defaultState);
    }

    loadDataSharingSettings = () => {
        this.props.d2.Api.getApi()
            .get('schemas', { fields: ['name', 'dataShareable'] })
            .then((schemas) => {
                const dataShareableTypes = schemas.schemas
                    .filter(item => item.dataShareable)
                    .map(item => item.name);

                this.setState({
                    dataShareableTypes,
                });
            });
    }

    loadObjectFromApi = (props) => {
        const setSharedObject = sharedObject => {
            this.setState({
                sharedObject,
            });
        }

        if (props.sharedObject) {
            setSharedObject(props.sharedObject);
        } else {
            this.props.d2.Api.getApi()
                .get('sharing', { type: props.type, id: props.id })
                .then((sharedObject) => setSharedObject(sharedObject))
                .catch((error) => {
                    this.setState({
                        errorMessage: error.message,
                    });
                });
        }
    }

    addId = object => ({ ...object, id: this.props.id });

    closeDialog = () => {
        this.props.onRequestClose(this.addId(this.state.sharedObject.object, this.props.id))
    }

    confirmAndCloseDialog = () => {
        this.props.onConfirm(this.addId(this.state.sharedObject.object, this.props.id));
    }

    translate = s => this.props.d2.i18n.getTranslation(s)

    render() {
        const dataShareable = this.state.dataShareableTypes.indexOf(this.props.type) !== -1;
        const errorOccurred = this.state.errorMessage !== '';
        const isLoading = !this.state.sharedObject && this.props.open && !errorOccurred;
        const sharingDialogActions = [
            <FlatButton
                label={this.translate('close')}
                onClick={this.closeDialog}
            />,
        ];

        if (this.props.doNotPost) sharingDialogActions.push(
            <RaisedButton
                primary
                style={{ marginLeft: '8px' }}
                label={this.translate('apply')}
                onClick={this.confirmAndCloseDialog}
            />
        )

        return (
            <div>
                <Snackbar
                    open={errorOccurred}
                    message={this.state.errorMessage}
                    autoHideDuration={3000}
                />
                <Dialog
                    autoDetectWindowHeight
                    autoScrollBodyContent
                    open={this.props.open}
                    title={this.props.d2.i18n.getTranslation('share')}
                    actions={sharingDialogActions}
                    onRequestClose={this.closeDialog}
                    {...this.props}
                >
                    { isLoading && <LoadingMask style={styles.loadingMask} size={1} /> }
                    { this.state.sharedObject &&
                        <Sharing
                            sharedObject={this.state.sharedObject}
                            dataShareable={dataShareable}
                            onChange={this.onSharingChanged}
                            onSearch={this.onSearchRequest}
                        />
                    }
                </Dialog>
            </div>
        );
    }
}

SharingDialog.childContextTypes = {
    d2: PropTypes.object,
};

SharingDialog.propTypes = {
    /**
     * Decides whether the dialog should be open or closed.
     */
    open: PropTypes.bool.isRequired,

    /**
     * Type of the sharable object. Can be supplied after initial render.
     */
    type: PropTypes.string,

    /**
     * Id of the sharable object. Can be supplied after initial render.
     */
    id: PropTypes.string,

    /**
     * Do not post new sharing settings. Rather, let the user save the new
     * settings returned from onRequestClose or onConfirm. Combine with
     * 'sharedObject' prop to skip all network requests.
     */
    doNotPost: PropTypes.bool,

    /**
     * Supply your own shared object. Will try to POST sharing settings
     * to the 'id' and 'type' combination. Use 'doNotPost' prop if you
     * want full control over network requests.
     */
    sharedObject: PropTypes.shape({
        object: PropTypes.shape({
            user: PropTypes.shape({ name: PropTypes.string }).isRequired,
            displayName: PropTypes.string.isRequired,
            userAccesses: PropTypes.array.isRequired,
            userGroupAccesses: PropTypes.array.isRequired,
            publicAccess: PropTypes.string.isRequired,
            externalAccess: PropTypes.bool,
        }),
        meta: PropTypes.shape({
            allowPublicAccess: PropTypes.bool.isRequired,
            allowExternalAccess: PropTypes.bool.isRequired,
        }),
    }),

    /**
     * Function to be called when the dialog is closed. The function is called
     * with the updated sharing preferences as the first and only argument.
     */
    onRequestClose: PropTypes.func.isRequired,

    /**
     * Function to be called when user applies the settings. Similar to
     * onRequestClose, but is only shown when doNotPost is true.
     */
    onConfirm: PropTypes.func,

    /**
     * d2 instance to use.
     */
    d2: PropTypes.object.isRequired,
};

SharingDialog.defaultProps = {
    type: '',
    id: '',
    doNotPost: false,
    sharedObject: null,
};

export default SharingDialog;
