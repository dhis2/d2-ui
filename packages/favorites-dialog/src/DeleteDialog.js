import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
