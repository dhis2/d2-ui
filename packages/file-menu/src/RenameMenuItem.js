import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import i18n from '@dhis2/d2-i18n';
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
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleRenameDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Rename')} />
                </MenuItem>
                {fileModel ? (
                    <RenameDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        fileModel={fileModel}
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
    fileType: null,
    fileModel: null,
    onRename: null,
    onRenameError: null,
};

RenameMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRename: PropTypes.func,
    onRenameError: PropTypes.func,
};

export default RenameMenuItem;
