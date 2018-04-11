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

    onWriteInterpretation = async form => {
        this.toggleWriteInterpretationDialog();

        const { favoriteType, favoriteModel } = this.props;

        if (favoriteModel) {
            const url = `/interpretations/${favoriteType}/${favoriteModel.id}`;
            const headers = { 'Content-Type': 'text/plain' };

            try {
                await this.context.d2.Api.getApi().post(url, form.interpretationText, { headers });

                if (this.props.onWriteInterpretation) {
                    this.props.onWriteInterpretation();
                }
            } catch (err) {
                this.props.onError(err);
            }
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
                    <ListItemText primary="Write Interpretation" />
                </MenuItem>
                {favoriteModel ? (
                    <WriteInterpretationDialog
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleWriteInterpretationDialog}
                        onRequestWriteInterpretation={this.onWriteInterpretation}
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
};

export default WriteInterpretationMenuItem;
