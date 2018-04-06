import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';

import FavoritesDialog from 'd2-ui-favorites-dialog';

class OpenMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = event => {
        this.toggleFavoritesDialog();
    };

    onOpen = id => {
        this.toggleFavoritesDialog();

        if (this.props.onOpen) {
            this.props.onOpen(id);
        }
    };

    toggleFavoritesDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { favoriteType } = this.props;

        return (
            <Fragment>
                <MenuItem button={true} onClick={this.toggleFavoritesDialog}>
                    <ListItemIcon>
                        <OpenInBrowser />
                    </ListItemIcon>
                    <ListItemText primary="Open" />
                </MenuItem>
                <FavoritesDialog
                    open={this.state.dialogIsOpen}
                    type={favoriteType}
                    d2={this.context.d2}
                    onRequestClose={this.toggleFavoritesDialog}
                    onFavoriteSelect={this.onOpen}
                />
            </Fragment>
        );
    }
}

OpenMenuItem.contextTypes = {
    d2: PropTypes.object,
};

OpenMenuItem.propTypes = {
    favoriteType: PropTypes.string,
    onOpen: PropTypes.func,
};

export default OpenMenuItem;
