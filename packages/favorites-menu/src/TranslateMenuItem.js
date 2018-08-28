import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TranslationDialog from '@dhis2/d2-ui-translation-dialog';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Translate from '@material-ui/icons/Translate';

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
        const { enabled, favoriteModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleTranslationDialog}>
                    <ListItemIcon>
                        <Translate />
                    </ListItemIcon>
                    <ListItemText primary="Translate" />
                </MenuItem>
                {favoriteModel ? (
                    <TranslationDialog
                        d2={this.context.d2}
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.toggleTranslationDialog}
                        objectToTranslate={favoriteModel}
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
    favoriteModel: null,
    onTranslate: null,
    onTranslateError: null,
};

TranslateMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onTranslate: PropTypes.func.isRequired,
    onTranslateError: PropTypes.func.isRequired,
};

export default TranslateMenuItem;
