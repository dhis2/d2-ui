import React from 'react';
import { connect } from 'react-redux';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';

import { renameFavorite, toggleRenameDialog, setFormFieldValue } from './actions';

const RenameDialog = props => {
    const {
        open,
        favoriteModel,
        newName,
        newDescription,
        toggleRenameDialog,
        renameFavorite,
        setFormFieldValue,
    } = props;

    const handleSubmit = event => {
        event.preventDefault();

        renameFavorite();
    };

    const handleChange = field => event => {
        event.preventDefault();

        setFormFieldValue(field, event.target.value);
    };

    return (
        <Dialog open={open} onClose={toggleRenameDialog} maxWidth="md">
            <form onSubmit={handleSubmit}>
                <DialogTitle>Rename favorite</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <TextField
                            label="Name"
                            value={newName || (favoriteModel ? favoriteModel.displayName : '')}
                            required
                            margin="normal"
                            onChange={handleChange('newName')}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            value={
                                newDescription ||
                                (favoriteModel ? favoriteModel.displayDescription : '')
                            }
                            margin="normal"
                            multiline
                            rowsMax={4}
                            onChange={handleChange('newDescription')}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleRenameDialog} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} color="primary">
                        Rename
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default connect(
    state => ({
        open: state.actions.rename.dialogIsOpen,
        favoriteModel: state.actions.select.favoriteModel,
        newName: state.actions.rename.newName,
        newDescription: state.actions.rename.newDescription,
    }),
    { renameFavorite, toggleRenameDialog, setFormFieldValue }
)(RenameDialog);
