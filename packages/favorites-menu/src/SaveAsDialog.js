import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';

class SaveAsDialog extends Component {
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

    handleSubmit = event => {
        event.preventDefault();

        this.props.onRequestSaveAs(this.state);
    };

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

    render() {
        const { open, rename } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle>{rename ? 'Rename favorite' : 'Save favorite as'}</DialogTitle>
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
                            {rename ? 'Rename' : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

SaveAsDialog.contextTypes = {
    d2: PropTypes.object,
};

SaveAsDialog.propTypes = {
    open: PropTypes.bool,
    rename: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestSaveAs: PropTypes.func,
};

export default SaveAsDialog;
