import { config } from 'd2/lib/d2';
import Dialog from 'material-ui/Dialog/Dialog';
import React, { PropTypes, Component } from 'react';
import { getTranslationFormFor } from './TranslationForm.component';

config.i18n.strings.add('close');
config.i18n.strings.add('sharing_settings');

export default class TranslationDialog extends Component {
    constructor(props, context) {
        super(props, context);

        this.i18n = context.d2.i18n;

        this.state = {
            TranslationForm: getTranslationFormFor(this.props.objectToTranslate),
        };

        this.translationSaved = this.translationSaved.bind(this);
        this.translationError = this.translationError.bind(this);
        this.closeSharingDialog = this.closeSharingDialog.bind(this);
    }

    render() {
        return (
            <Dialog
                title={this.i18n.getTranslation('translation_dialog_title')}
                autoDetectWindowHeight
                autoScrollBodyContent
                {...this.props} >
                <this.state.TranslationForm
                    onTranslationSaved={this.translationSaved}
                    onTranslationError={this.translationError}
                    onCancel={this.closeSharingDialog}
                    fieldsToTranslate={this.props.fieldsToTranslate}
                />
            </Dialog>
        );
    }

    componentWillReceiveProps(newProps) {
        if (newProps.objectToTranslate) {
            this.setState({
                TranslationForm: getTranslationFormFor(newProps.objectToTranslate),
            });
        }
    }

    closeSharingDialog() {
        this.props.onRequestClose();
    }

    translationSaved() {
        this.props.onTranslationSaved();
        this.closeSharingDialog();
    }

    translationError() {
        this.props.onTranslationError();
    }
}

TranslationDialog.propTypes = {
    objectToTranslate: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
    }).isRequired,
    onTranslationSaved: React.PropTypes.func.isRequired,
    onTranslationError: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func.isRequired,
    fieldsToTranslate: React.PropTypes.array,
};

TranslationDialog.contextTypes = {
    d2: PropTypes.object,
};
