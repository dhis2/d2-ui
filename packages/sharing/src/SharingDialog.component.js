import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import Sharing from './Sharing.component';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';

const styles = {
    loadingMask: {
        position: 'relative',
    },
};

const defaultState = {
    api: null,
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
        if (this.props.open && this.props.type && this.props.id) {
            this.loadObjectFromApi(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        const hasChanged = this.createPropsChecker(nextProps);

        if (hasChanged('id') || hasChanged('type')) {
            this.resetState();
            if (nextProps.open) this.loadObjectFromApi(nextProps);
        }
        if (!this.props.open && nextProps.open) {
            this.loadObjectFromApi(nextProps);
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

        this.postChanges(updatedObject, onSuccess);
    }

    createPropsChecker = nextProps => field => nextProps[field] !== this.props[field];

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
                }

                return message;
            }).catch(({ message }) => {
                this.setState({
                    errorMessage: message,
                });
            });
    }

    resetState = () => {
        this.setState(defaultState);
    }

    loadDataSharingSettings = () => {
        const api = this.props.d2.Api.getApi();

        api
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

    loadObjectFromApi = ({id, type}) => {
        const api = this.props.d2.Api.getApi();

        api
        .get('sharing', { type, id })
        .then((sharedObject) => {
            this.setState({
                api,
                sharedObject,
            });
        })
        .catch((error) => {
            this.setState({
                errorMessage: error.message,
            });
        });
    }

    closeSharingDialog = () => {
        this.props.onRequestClose(this.state.sharedObject.object);
    }

    render() {
        const dataShareable = this.state.dataShareableTypes.indexOf(this.props.type) !== -1;
        const errorOccurred = this.state.errorMessage !== '';
        const isLoading = !this.state.sharedObject && this.props.open && !errorOccurred;
        const sharingDialogActions = [
            <FlatButton
                label={this.props.d2.i18n.getTranslation('close')}
                onClick={this.closeSharingDialog}
            />,
        ];

        return (
            <div>
                <Snackbar
                    open={errorOccurred}
                    message={this.state.errorMessage}
                    autoHideDuration={3000}
                />
                { isLoading && <LoadingMask style={styles.loadingMask} size={1} /> }
                { this.state.sharedObject &&
                    <Dialog
                        autoDetectWindowHeight
                        autoScrollBodyContent
                        open={this.props.open}
                        title={this.props.d2.i18n.getTranslation('share')}
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
                }
            </div>
        );
    }
}

SharingDialog.childContextTypes = {
    d2: PropTypes.object
};

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
    d2: PropTypes.object.isRequired,
};

export default SharingDialog;
