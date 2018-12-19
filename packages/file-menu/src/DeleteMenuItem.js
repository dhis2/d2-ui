import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Delete from '@material-ui/icons/Delete';

import i18n from '@dhis2/d2-i18n';
import isEqual from 'lodash/fp/isEqual';

import DeleteDialog from './DeleteDialog';

class DeleteMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        let shouldUpdate = this.state.dialogIsOpen !== nextState.dialogIsOpen;
        if ( !shouldUpdate ) {
            //if state wasnt changed, check if props changed
            shouldUpdate = !isEqual(nextProps, this.props);
        } 

        return shouldUpdate;
    }

    onClose = () => {
        this.toggleDeleteDialog();

        this.props.onClose();
    };

    onDialogReturn = success => (...args) => {
        const { onDelete, onDeleteError } = this.props;

        this.toggleDeleteDialog();

        if (success) {
            onDelete(...args);
        } else {
            onDeleteError(...args);
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
                        onRequestClose={this.onClose}
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
    onDelete: Function.prototype,
    onDeleteError: Function.prototype,
    onClose: Function.prototype,
};

DeleteMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onDelete: PropTypes.func,
    onDeleteError: PropTypes.func,
    onClose: PropTypes.func,
};

export default DeleteMenuItem;
