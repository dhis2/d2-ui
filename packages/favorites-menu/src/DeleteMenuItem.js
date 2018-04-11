import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Delete from 'material-ui-icons/Delete';

import DeleteDialog from './DeleteDialog';

class DeleteMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleDeleteDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    onDelete = () => {
        this.toggleDeleteDialog();

        if (this.props.onDelete) {
            this.props.onDelete();
        }
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
                        onRequestDelete={this.onDelete}
                        favoriteModel={favoriteModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

DeleteMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
    onDelete: PropTypes.func,
};

export default DeleteMenuItem;
