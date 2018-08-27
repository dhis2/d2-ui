import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

class RenameDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            newDescription: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // reset form to initial value when reopening the save as dialog
        if (nextProps.open === true && !this.state.newName) {
            this.setState({
                newName: nextProps.favoriteModel.displayName || '',
                newDescription: nextProps.favoriteModel.displayDescription || '',
            });
        }
    }

    handleChange = field => event => {
        event.preventDefault();

        this.setState({
            [field]: event.target.value,
        });
    };

    onRequestClose = () => {
        // reset form so when the dialog is reopened is consistent
        // with the actual favorite
        this.setState({ newName: '', newDescription: '' });

        this.props.onRequestClose();
    };

    handleSubmit = async event => {
        event.preventDefault();

        const { favoriteModel, onRequestRename, onRequestRenameError } = this.props;

        if (favoriteModel) {
            const form = this.state;

            favoriteModel.name = form.newName;
            favoriteModel.description = form.newDescription;

            try {
                const validationStatus = await favoriteModel.validate();

                if (validationStatus.status === true) {
                    const payload = {
                        description: form.newDescription,
                    };

                    if (form.newName) {
                        payload.name = form.newName;
                    }

                    if (payload.name) {
                        await this.context.d2.Api.getApi().patch(favoriteModel.href, payload);

                        if (onRequestRename) {
                            onRequestRename();
                        }
                    }
                }
            } catch (err) {
                if (onRequestRenameError) {
                    onRequestRenameError(err);
                }
            }
        }
    };

    render() {
        const { open } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle>Rename favorite</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                label="Name"
                                value={this.state.newName}
                                required
                                margin="normal"
                                onChange={this.handleChange('newName')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Description"
                                value={this.state.newDescription}
                                margin="normal"
                                multiline
                                rowsMax={4}
                                onChange={this.handleChange('newDescription')}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={this.handleSubmit} color="primary">
                            Rename
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

RenameDialog.contextTypes = {
    d2: PropTypes.object,
};

RenameDialog.defaultProps = {
    open: false,
    favoriteModel: null,
    onRequestClose: null,
    onRequestRename: null,
    onRequestRenameError: null,
};

RenameDialog.propTypes = {
    open: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestRename: PropTypes.func,
    onRequestRenameError: PropTypes.func,
};

export default RenameDialog;
