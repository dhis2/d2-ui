import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';

import {
    toggleActionsMenu,
    toggleDeleteDialog,
    toggleRenameDialog,
    toggleShareDialog,
    deleteFavorite,
} from './actions';

const ActionsMenu = (props, context) => {
    const {
        open,
        anchorEl,
        toggleActionsMenu,
        toggleDeleteDialog,
        deleteDialogIsOpen,
        toggleShareDialog,
        toggleRenameDialog,
        shareDialogIsOpen,
        deleteFavorite,
        selectedFavoriteModel,
    } = props;

    const deleteActionHandler = () => {
        toggleActionsMenu();
        toggleDeleteDialog();
    };

    const renameActionHandler = () => {
        toggleActionsMenu();
        toggleRenameDialog();
    };

    const shareActionHandler = () => {
        toggleActionsMenu();
        toggleShareDialog();
    };

    return (
        <div>
            <Menu open={open} onClose={toggleActionsMenu} anchorEl={anchorEl}>
                <MenuItem
                    onClick={renameActionHandler}
                    disabled={selectedFavoriteModel && !selectedFavoriteModel.access.update}
                >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rename" />
                </MenuItem>
                <MenuItem
                    onClick={shareActionHandler}
                    disabled={selectedFavoriteModel && !selectedFavoriteModel.access.manage}
                >
                    <ListItemIcon>
                        <ShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                </MenuItem>
                <MenuItem
                    onClick={deleteActionHandler}
                    disabled={selectedFavoriteModel && !selectedFavoriteModel.access.delete}
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
            <RenameDialog />
            {selectedFavoriteModel ? (
                <SharingDialog
                    open={shareDialogIsOpen}
                    id={selectedFavoriteModel.id}
                    type={selectedFavoriteModel.modelDefinition.name}
                    onRequestClose={toggleShareDialog}
                    d2={context.d2}
                />
            ) : null}
            <DeleteDialog
                open={deleteDialogIsOpen}
                onRequestClose={toggleDeleteDialog}
                onRequestDelete={deleteFavorite}
            />
        </div>
    );
};

ActionsMenu.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        open: state.actions.menuIsOpen,
        anchorEl: state.actions.menuAnchorEl,
        deleteDialogIsOpen: state.actions.remove.dialogIsOpen,
        shareDialogIsOpen: state.actions.share.dialogIsOpen,
        selectedFavoriteModel: state.actions.select.favoriteModel,
    }),
    {
        toggleActionsMenu,
        toggleRenameDialog,
        toggleDeleteDialog,
        toggleShareDialog,
        deleteFavorite,
    }
)(ActionsMenu);
