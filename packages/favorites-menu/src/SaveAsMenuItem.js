import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Save from 'material-ui-icons/Save';

import SaveAsDialog from './SaveAsDialog';

class SaveAsMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleSaveAsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    onSaveAs = form => {
        this.toggleSaveAsDialog();

        if (this.props.onSaveAs) {
            this.props.onSaveAs(form);
        }
    };

    render() {
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem button={true} onClick={this.toggleSaveAsDialog} disabled={!enabled}>
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    <ListItemText primary="Save as..." />
                </MenuItem>
                {favoriteModel ? (
                    <SaveAsDialog
                        open={this.state.dialogIsOpen}
                        favoriteModel={favoriteModel}
                        onRequestClose={this.toggleSaveAsDialog}
                        onRequestSaveAs={this.onSaveAs}
                    />
                ) : null}
            </Fragment>
        );
    }
}

SaveAsMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onSaveAs: PropTypes.func,
};

export default SaveAsMenuItem;
