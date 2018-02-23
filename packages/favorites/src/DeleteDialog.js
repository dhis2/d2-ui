import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const DeleteDialog = props => {
    const { open, onRequestClose, onRequestDelete } = props;

    return (
        <Dialog open={open} onClose={onRequestClose} maxWidth="xs">
            <DialogTitle>Delete favorite</DialogTitle>
            <DialogContent>This favorite will be deleted. Continue?</DialogContent>
            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onRequestDelete} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
