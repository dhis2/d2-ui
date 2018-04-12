import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TranslationDialog from 'd2-ui-translation-dialog';

import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Translate from 'material-ui-icons/Translate';

class TranslateMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    toggleTranslationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, favoriteModel, onTranslateError, onTranslate } = this.props;

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
                        onTranslationSaved={onTranslate}
                        onTranslationError={onTranslateError}
                    />
                ) : null}
            </Fragment>
        );
    }
}

TranslateMenuItem.contextTypes = {
    d2: PropTypes.object,
};

TranslateMenuItem.propTypes = {
    enabled: PropTypes.bool,
    favoriteModel: PropTypes.object,
    onTranslate: PropTypes.func.isRequired,
    onTranslateError: PropTypes.func.isRequired,
};

export default TranslateMenuItem;
