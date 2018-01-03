import React from 'react';
import { connect } from 'react-redux';

import Menu, { MenuItem } from 'material-ui-next/Menu';
import { ListItemIcon, ListItemText } from 'material-ui-next/List';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';
import SharingDialog from '../sharing/SharingDialog.component';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';

import {
    toggleActionsMenu,
    toggleDeleteDialog,
    toggleRenameDialog,
    toggleShareDialog,
    deleteFavorite,
} from './actions';

const ActionsMenu = props => {
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
                <MenuItem onClick={renameActionHandler}>
                    <ListItemIcon>
                        <ModeEditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rename" />
                </MenuItem>
                <MenuItem onClick={shareActionHandler}>
                    <ListItemIcon>
                        <ShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                </MenuItem>
                <MenuItem onClick={deleteActionHandler}>
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
