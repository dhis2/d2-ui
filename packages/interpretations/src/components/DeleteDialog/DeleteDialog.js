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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className={classes.content}>
            {text}
            <DialogActions className={classes.actions}>
                <Button
                    className={classes.button}
                    onClick={onCancel}
                    variant="outlined"
                >
                    {i18n.t('Cancel')}
                </Button>
                <Button
                    className={classes.button}
                    onClick={onDelete}
                    color="primary"
                    variant="contained"
                >
                    {i18n.t('Confirm')}
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
);

export default withStyles(styles)(DeleteDialog);

DeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
