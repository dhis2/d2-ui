import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/icons/Link';

import GetLinkDialog from './GetLinkDialog';

class GetLinkMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleGetLinkDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, favoriteType, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleGetLinkDialog}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText primary="Get link" />
                </MenuItem>
                {favoriteModel ? (
                    <GetLinkDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleGetLinkDialog}
                        favoriteType={favoriteType}
                        favoriteModel={favoriteModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

GetLinkMenuItem.contextTypes = {
    d2: PropTypes.object,
};

GetLinkMenuItem.defaultProps = {
    enabled: false,
    favoriteModel: null,
    favoriteType: null,
};

GetLinkMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
};

export default GetLinkMenuItem;
