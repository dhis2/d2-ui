import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Share from 'material-ui-icons/Share';
import SharingDialog from 'd2-ui-sharing-dialog';

class ShareMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleSharingDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    onShare = () => {
        this.toggleSharingDialog();

        if (this.props.onShare) {
            this.props.onShare();
        }
    };

    render() {
        const { enabled, favoriteModel, favoriteType } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleSharingDialog}>
                    <ListItemIcon>
                        <Share />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                </MenuItem>
                {favoriteModel ? (
                    <SharingDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.onShare}
                        d2={this.context.d2}
                        id={favoriteModel.id}
                        type={favoriteType}
                    />
                ) : null}
            </Fragment>
        );
    }
}

ShareMenuItem.contextTypes = {
    d2: PropTypes.object,
};

ShareMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
    onShare: PropTypes.func,
};

export default ShareMenuItem;
