import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Share from 'material-ui-icons/Share';

import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

class ShareMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

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

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleSharingDialog}>
                    <ListItemIcon>
                        <Share />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Share')} />
                </MenuItem>
                {fileModel ? (
                    <SharingDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.onShare}
                        d2={this.context.d2}
                        id={fileModel.id}
                        type={fileType}
                    />
                ) : null}
            </Fragment>
        );
    }
}

ShareMenuItem.contextTypes = {
    d2: PropTypes.object,
};

ShareMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onShare: null,
};

ShareMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onShare: PropTypes.func,
};

export default ShareMenuItem;
