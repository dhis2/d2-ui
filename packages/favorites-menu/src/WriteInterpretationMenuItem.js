import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import WriteInterpretationDialog from './WriteInterpretationDialog';

class WriteInterpretationMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleWriteInterpretationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    onDialogReturn = success => () => {
        const { onWriteInterpretation, onWriteInterpretationError } = this.props;

        this.toggleWriteInterpretationDialog();

        if (success && onWriteInterpretation) {
            onWriteInterpretation();
        } else if (onWriteInterpretationError) {
            onWriteInterpretationError();
        }
    };

    render() {
        const { enabled, favoriteModel, favoriteType } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleWriteInterpretationDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary="Write interpretation" />
                </MenuItem>
                {favoriteModel ? (
                    <WriteInterpretationDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleWriteInterpretationDialog}
                        onRequestWriteInterpretation={this.onDialogReturn(true)}
                        onRequestWriteInterpretationError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

WriteInterpretationMenuItem.contextTypes = {
    d2: PropTypes.object,
};

WriteInterpretationMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    favoriteType: PropTypes.string,
    onWriteInterpretation: PropTypes.func,
    onWriteInterpretationError: PropTypes.func,
};

export default WriteInterpretationMenuItem;
