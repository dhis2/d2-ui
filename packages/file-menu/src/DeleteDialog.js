import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import i18n from '@dhis2/d2-i18n';
import { getFileTypeLabel } from './util';

const DeleteDialog = props => {
    const {
        open,
        fileType,
        fileModel,
        onRequestClose,
        onRequestDelete,
        onRequestDeleteError,
    } = props;

    const deleteFavorite = () => {
        if (fileModel) {
            fileModel
                .delete()
                .then(onRequestDelete)
                .catch(onRequestDeleteError);
        }
    };

    return (
        <Dialog open={open} onClose={onRequestClose} maxWidth={false}>
            <DialogTitle>
                {i18n.t('Delete {{what}}', { what: getFileTypeLabel(fileType) })}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {i18n.t('This {{what}} will be deleted. Continue?', {
                        what: getFileTypeLabel(fileType),
                    })}
                </DialogContentText>
            </DialogContent>
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
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestDelete: null,
    onRequestDeleteError: null,
};

DeleteDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestDelete: PropTypes.func,
    onRequestDeleteError: PropTypes.func,
};

export default DeleteDialog;
