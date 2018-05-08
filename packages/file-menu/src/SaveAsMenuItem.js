import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Save from 'material-ui-icons/Save';

import i18n from '@dhis2/d2-i18n';
import SaveAsDialog from './SaveAsDialog';

class SaveAsMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

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
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem button onClick={this.toggleSaveAsDialog} disabled={!enabled}>
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Save as...')} />
                </MenuItem>
                {fileModel ? (
                    <SaveAsDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        fileModel={fileModel}
                        onRequestClose={this.toggleSaveAsDialog}
                        onRequestSaveAs={this.onSaveAs}
                    />
                ) : null}
            </Fragment>
        );
    }
}

SaveAsMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onSaveAs: null,
};

SaveAsMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onSaveAs: PropTypes.func,
};

export default SaveAsMenuItem;
