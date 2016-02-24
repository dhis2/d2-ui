import { config } from 'd2/lib/d2';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { PropTypes, createClass, default as React } from 'react';
import Translate from '../i18n/Translate.mixin';
import TranslationForm from './TranslationForm.component';

config.i18n.strings.add('close');
config.i18n.strings.add('sharing_settings');

export default createClass({
    propTypes: {
        objectIdToTranslate: PropTypes.object.isRequired,
        objectTypeToTranslate: PropTypes.string.isRequired,
        onTranslationSaved: PropTypes.string.isRequired,
    },

    mixins: [Translate],

    render() {
        const translationDialogActions = [
            <FlatButton
                label={this.getTranslation('close')}
                onClick={this.closeSharingDialog} />,
        ];

        return (
            <Dialog
                ref="translationDialog"
                title={this.getTranslation('translation_dialog_title')}
                actions={translationDialogActions}
                autoDetectWindowHeight
                autoScrollBodyContent
                {...this.props} >
                <TranslationForm {...this.props}
                                 objectIdToTranslate={this.props.objectIdToTranslate}
                                 objectTypeToTranslate={this.props.objectTypeToTranslate} />
            </Dialog>
        );
    },

    closeSharingDialog() {
        this.refs.translationDialog.dismiss();
    },
});
