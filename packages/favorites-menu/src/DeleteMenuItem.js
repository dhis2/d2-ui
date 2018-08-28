import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Delete from '@material-ui/icons/Delete';

import DeleteDialog from './DeleteDialog';

class DeleteMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onDelete, onDeleteError } = this.props;

        this.toggleDeleteDialog();

        if (success && onDelete) {
            onDelete();
        } else if (onDeleteError) {
            onDeleteError();
        }
    };

    toggleDeleteDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleDeleteDialog}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
                {favoriteModel ? (
                    <DeleteDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleDeleteDialog}
                        onRequestDelete={this.onDialogReturn(true)}
                        onRequestDeleteError={this.onDialogReturn(false)}
                        favoriteModel={favoriteModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

DeleteMenuItem.defaultProps = {
    enabled: false,
    favoriteModel: null,
    onDelete: null,
    onDeleteError: null,
};

DeleteMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onDelete: PropTypes.func,
    onDeleteError: PropTypes.func,
};

export default DeleteMenuItem;
