import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Delete from 'material-ui-icons/Delete';

import i18n from '@dhis2/d2-i18n';
import DeleteDialog from './DeleteDialog';

class DeleteMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onDelete, onDeleteError } = this.props;

        this.toggleDeleteDialog();

        if (success && onDelete) {
            onDelete();
        } else if (onDeleteError) {
            onDeleteError();
        }
    };

    toggleDeleteDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleDeleteDialog}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Delete')} />
                </MenuItem>
                {fileModel ? (
                    <DeleteDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleDeleteDialog}
                        onRequestDelete={this.onDialogReturn(true)}
                        onRequestDeleteError={this.onDialogReturn(false)}
                        fileType={fileType}
                        fileModel={fileModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

DeleteMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onDelete: null,
    onDeleteError: null,
};

DeleteMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onDelete: PropTypes.func,
    onDeleteError: PropTypes.func,
};

export default DeleteMenuItem;
