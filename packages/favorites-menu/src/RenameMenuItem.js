import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import SaveAsDialog from './SaveAsDialog';

class RenameMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleSaveAsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    onRequestRename = async form => {
        this.toggleSaveAsDialog();

        const favoriteModel = this.props.favoriteModel;

        if (favoriteModel) {
            favoriteModel.name = form.newName;
            favoriteModel.description = form.newDescription;

            try {
                const validationStatus = await favoriteModel.validate();

                if (validationStatus.status === true) {
                    const payload = {
                        description: form.newDescription,
                    };

                    if (form.newName) {
                        payload.name = form.newName;
                    }

                    if (payload.name) {
                        await this.context.d2.Api.getApi().patch(favoriteModel.href, payload);

                        if (this.props.onRequestRename) {
                            this.props.onRequestRename();
                        }
                    }
                }
            } catch (err) {
                this.props.onError(err);
            }
        }
    };

    render() {
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleSaveAsDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary="Rename" />
                </MenuItem>
                {favoriteModel ? (
                    <SaveAsDialog
                        open={this.state.dialogIsOpen}
                        rename={true}
                        onRequestClose={this.toggleSaveAsDialog}
                        onRequestSaveAs={this.onRequestRename}
                        favoriteModel={favoriteModel}
                    />
                ) : null}
            </Fragment>
        );
    }
}

RenameMenuItem.contextTypes = {
    d2: PropTypes.object,
};

RenameMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteType: PropTypes.string,
    favoriteModel: PropTypes.object,
    onRequestRename: PropTypes.func,
};

export default RenameMenuItem;
