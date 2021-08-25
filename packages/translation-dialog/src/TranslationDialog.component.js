import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { mui3theme } from '@dhis2/d2-ui-core';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TranslationFormWithData from './TranslationForm.component';

class TranslationDialog extends Component {
    constructor(props) {
        super(props);

        this.i18n = props.d2.i18n;
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    closeDialog = () => {
        this.props.onRequestClose();
    }

    translationSaved = (args) => {
        this.props.onTranslationSaved(args);
        this.closeDialog();
    }

    translationError = (err) => {
        this.props.onTranslationError(err);
    }

    muiDialogProps = () => {
        const pick = ({
            open,
            onEnter,
            onExit,
            onExited }) => ({
            open,
            onEnter,
            onExit,
            onExited,
        });

        return pick(this.props);
    }

    getDialog = () => (
        <Dialog
            onClose={this.closeDialog}
            maxWidth="lg"
            {...this.muiDialogProps()}
        >
            <DialogTitle id="form-dialog-title">{this.i18n.getTranslation('translation_dialog_title')}</DialogTitle>
            <TranslationFormWithData
                model={this.props.objectToTranslate}
                onTranslationSaved={this.translationSaved}
                onTranslationError={this.translationError}
                onCancel={this.closeDialog}
                fieldsToTranslate={this.props.fieldsToTranslate}
                isOnline={this.props.isOnline}
            />
        </Dialog>
    )

    render() {
        if (this.props.insertTheme) {
            return (
                <MuiThemeProvider theme={createMuiTheme(mui3theme)}>
                    {this.getDialog()}
                </MuiThemeProvider>
            );
        }

        return this.getDialog()
    }
}

TranslationDialog.defaultProps = {
    fieldsToTranslate: [],
    insertTheme: false,
};

TranslationDialog.propTypes = {
    insertTheme: PropTypes.bool,
    isOnline: PropTypes.bool,
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    fieldsToTranslate: PropTypes.array,
    d2: PropTypes.object.isRequired,
};

TranslationDialog.childContextTypes = {
    d2: PropTypes.object,
};


export default TranslationDialog;
