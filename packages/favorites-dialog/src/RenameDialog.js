import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { renameFavorite, toggleRenameDialog } from './actions';

class RenameDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            newDescription: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // reset form to initial value when reopening the rename dialog
        if (nextProps.open === true) {
            this.setState({
                newName: nextProps.favoriteModel.displayName || '',
                newDescription: nextProps.favoriteModel.displayDescription || '',
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.renameFavorite(this.state);
    };

    handleChange = field => event => {
        event.preventDefault();

        this.setState({
            [field]: event.target.value,
        });
    };

    render() {
        const { open, toggleRenameDialog, renameFavorite } = this.props;

        return (
            <Dialog open={open} onClose={toggleRenameDialog} maxWidth="md">
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
                        <Button onClick={toggleRenameDialog} color="primary">
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

export default connect(
    state => ({
        open: state.actions.rename.dialogIsOpen,
        favoriteModel: state.actions.select.favoriteModel,
    }),
    { renameFavorite, toggleRenameDialog }
)(RenameDialog);
