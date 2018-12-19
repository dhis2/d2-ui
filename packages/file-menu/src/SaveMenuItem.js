import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Save from '@material-ui/icons/Save';

import i18n from '@dhis2/d2-i18n';
import { isEqual } from 'lodash-es';

import SaveAsDialog from './SaveAsDialog';

class SaveMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        //check state first, then props. If state has changed we don't need to deepcompare props too as it 
        //would be a performance hit doing both if we already know that state was changed.

        let shouldUpdate = !isEqual(nextState, this.state);
        if ( !shouldUpdate ) {
            //if state wasnt changed, check if props changed
            shouldUpdate = !isEqual(nextProps, this.props);
        } 
        
        return shouldUpdate;
    }

    onClose = () => {
        this.toggleSaveAsDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    onSaveAs = form => {
        this.toggleSaveAsDialog();

        if (this.props.onSaveAs) {
            this.props.onSaveAs(form);
        }
    };

    toggleSaveAsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel, onSave } = this.props;

        return (
            <Fragment>
                <MenuItem
                    button
                    onClick={fileModel ? onSave : this.toggleSaveAsDialog}
                    disabled={!enabled}
                >
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Save')} />
                </MenuItem>
                {fileModel ? null : (
                    <SaveAsDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        onRequestClose={this.onClose}
                        onRequestSaveAs={this.onSaveAs}
                    />
                )}
            </Fragment>
        );
    }
}

SaveMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onSave: null,
    onSaveAs: null,
    onClose: null,
};

SaveMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onSave: PropTypes.func,
    onSaveAs: PropTypes.func,
    onClose: PropTypes.func,
};

export default SaveMenuItem;
