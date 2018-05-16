import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';

import i18n from '@dhis2/d2-i18n';
import FavoritesDialog from '@dhis2/d2-ui-favorites-dialog';

class OpenMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = () => {
        this.toggleFavoritesDialog();
    };

    onOpen = (id) => {
        this.toggleFavoritesDialog();

        if (this.props.onOpen) {
            this.props.onOpen(id);
        }
    };

    toggleFavoritesDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { fileType } = this.props;

        return (
            <Fragment>
                <MenuItem button onClick={this.toggleFavoritesDialog}>
                    <ListItemIcon>
                        <OpenInBrowser />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Open')} />
                </MenuItem>
                <FavoritesDialog
                    open={this.state.dialogIsOpen}
                    type={fileType}
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

OpenMenuItem.defaultProps = {
    fileType: null,
    onOpen: null,
};

OpenMenuItem.propTypes = {
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    onOpen: PropTypes.func,
};

export default OpenMenuItem;
