import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Translate from 'material-ui-icons/Translate';

import i18n from '@dhis2/d2-i18n';
import TranslationDialog from '@dhis2/d2-ui-translation-dialog';

class TranslateMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onDialogReturn = success => () => {
        const { onTranslate, onTranslateError } = this.props;

        this.toggleTranslationDialog();

        if (success && onTranslate) {
            onTranslate();
        } else if (onTranslateError) {
            onTranslateError();
        }
    };

    toggleTranslationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleTranslationDialog}>
                    <ListItemIcon>
                        <Translate />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Translate')} />
                </MenuItem>
                {fileModel ? (
                    <TranslationDialog
                        d2={this.context.d2}
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleTranslationDialog}
                        objectToTranslate={fileModel}
                        fieldsToTranslate={['name', 'description']}
                        onTranslationSaved={this.onDialogReturn(true)}
                        onTranslationError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

TranslateMenuItem.contextTypes = {
    d2: PropTypes.object,
};

TranslateMenuItem.defaultProps = {
    enabled: false,
    fileModel: null,
    onTranslate: null,
    onTranslateError: null,
};

TranslateMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileModel: PropTypes.object,
    onTranslate: PropTypes.func.isRequired,
    onTranslateError: PropTypes.func.isRequired,
};

export default TranslateMenuItem;
