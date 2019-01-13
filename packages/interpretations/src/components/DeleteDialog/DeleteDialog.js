import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/DeleteDialog.style'

export const DeleteDialog = ({ classes, title, text, onDelete, onCancel }) => (
    <Dialog open={true} maxWidth="sm">
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogContent className={classes.content}>
            {text}
            <DialogActions className={classes.actions}>
                <Button onClick={onDelete} color="primary" variant="contained">
                    {i18n.t('Yes, delete')}
                </Button>
                <Button onClick={onCancel} variant="outlined">
                    {i18n.t('No, cancel')}
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
);

export default withStyles(styles)(DeleteDialog);

DeleteDialog.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};