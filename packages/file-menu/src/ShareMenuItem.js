import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Share from '@material-ui/icons/Share';

import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

import { supportedFileTypes } from './util';

class ShareMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = () => {
        this.toggleSharingDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    onShare = () => {
        this.toggleSharingDialog();

        if (this.props.onShare) {
            this.props.onShare();
        }
    };

    toggleSharingDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileModel, fileType } = this.props;
        const { d2, insertTheme } = this.context;

        return (
            <Fragment>
                <MenuItem
                    disabled={!enabled}
                    onClick={this.toggleSharingDialog}
                >
                    <ListItemIcon>
                        <Share />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Share')} />
                </MenuItem>
                {fileModel ? (
                    <SharingDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.onShare}
                        d2={d2}
                        id={fileModel.id}
                        type={fileType}
                        insertTheme={insertTheme}
                    />
                ) : null}
            </Fragment>
        );
    }
}

ShareMenuItem.contextTypes = {
    d2: PropTypes.object,
    insertTheme: PropTypes.bool,
};

ShareMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onShare: null,
    onClose: null,
};

ShareMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onShare: PropTypes.func,
    onClose: PropTypes.func,
};

export default ShareMenuItem;
