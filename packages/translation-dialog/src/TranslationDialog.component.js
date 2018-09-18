import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getTranslationFormFor } from './TranslationForm.component';

class TranslationDialog extends Component {
    constructor(props) {
        super(props);

        this.i18n = props.d2.i18n;

        this.state = {
            TranslationForm: getTranslationFormFor(props.objectToTranslate),
        };
    }

    getChildContext() {
        return { d2: this.props.d2 };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.objectToTranslate) {
            this.setState({
                TranslationForm: getTranslationFormFor(newProps.objectToTranslate),
            });
        }
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

    render() {
        return (
            <Dialog onClose={this.closeDialog} PaperProps={{ style: { width: '75%', maxWidth: '768px' } }} {...this.muiDialogProps()}>
                <DialogTitle id="form-dialog-title">{this.i18n.getTranslation('translation_dialog_title')}</DialogTitle>
                <this.state.TranslationForm
                    onTranslationSaved={this.translationSaved}
                    onTranslationError={this.translationError}
                    onCancel={this.closeDialog}
                    fieldsToTranslate={this.props.fieldsToTranslate}
                />
            </Dialog>
        );
    }
}

TranslationDialog.propTypes = {
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
