import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import RenameDialog from './RenameDialog';

class RenameMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onRename, onRenameError } = this.props;

        this.toggleRenameDialog();

        if (success && onRename) {
            onRename();
        } else if (onRenameError) {
            onRenameError();
        }
    };

    toggleRenameDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleRenameDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary="Rename" />
                </MenuItem>
                {favoriteModel ? (
                    <RenameDialog
                        open={this.state.dialogIsOpen}
                        favoriteModel={favoriteModel}
                        onRequestClose={this.toggleRenameDialog}
                        onRequestRename={this.onDialogReturn(true)}
                        onRequestRenameError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

RenameMenuItem.contextTypes = {
    d2: PropTypes.object,
};

RenameMenuItem.defaultProps = {
    enabled: false,
    favoriteModel: null,
    onRename: null,
    onRenameError: null,
};

RenameMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onRename: PropTypes.func,
    onRenameError: PropTypes.func,
};

export default RenameMenuItem;
