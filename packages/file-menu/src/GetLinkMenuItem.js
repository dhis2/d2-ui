import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Link from 'material-ui-icons/Link';

import i18n from '@dhis2/d2-i18n';
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
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleGetLinkDialog}>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Get link')} />
                </MenuItem>
                {fileModel ? (
                    <GetLinkDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleGetLinkDialog}
                        fileType={fileType}
                        fileModel={fileModel}
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
    fileType: null,
    fileModel: null,
};

GetLinkMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
};

export default GetLinkMenuItem;
