import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const DeleteDialog = props => {
    const { open, favoriteModel, onRequestClose, onRequestDelete, onRequestDeleteError } = props;

    const deleteFavorite = () => {
        if (favoriteModel) {
            favoriteModel
                .delete()
                .then(onRequestDelete())
                .catch(onRequestDeleteError());
        }
    };

    return (
        <Dialog open={open} onClose={onRequestClose} maxWidth={false}>
            <DialogTitle>Delete favorite</DialogTitle>
            <DialogContent>This favorite will be deleted. Continue?</DialogContent>
            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteFavorite} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteDialog.defaultProps = {
    open: false,
    favoriteModel: null,
    onRequestClose: null,
    onRequestDelete: null,
    onRequestDeleteError: null,
};

DeleteDialog.propTypes = {
    open: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestDelete: PropTypes.func,
    onRequestDeleteError: PropTypes.func,
};

export default DeleteDialog;
