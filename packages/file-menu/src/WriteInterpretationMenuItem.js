import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import ModeEdit from 'material-ui-icons/ModeEdit';

import i18n from '@dhis2/d2-i18n';
import WriteInterpretationDialog from './WriteInterpretationDialog';

class WriteInterpretationMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onWriteInterpretation, onWriteInterpretationError } = this.props;

        this.toggleWriteInterpretationDialog();

        if (success && onWriteInterpretation) {
            onWriteInterpretation();
        } else if (onWriteInterpretationError) {
            onWriteInterpretationError();
        }
    };

    toggleWriteInterpretationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileType, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleWriteInterpretationDialog}>
                    <ListItemIcon>
                        <ModeEdit />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Write interpretation')} />
                </MenuItem>
                {fileModel ? (
                    <WriteInterpretationDialog
                        open={this.state.dialogIsOpen}
                        fileType={fileType}
                        fileModel={fileModel}
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

WriteInterpretationMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onWriteInterpretation: null,
    onWriteInterpretationError: null,
};

WriteInterpretationMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onWriteInterpretation: PropTypes.func,
    onWriteInterpretationError: PropTypes.func,
};

export default WriteInterpretationMenuItem;
