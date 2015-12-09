import {config} from 'd2/lib/d2';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Sharing from './Sharing.component';

config.i18n.strings.add('close');
config.i18n.strings.add('sharing_settings');

export default createClass({
    propTypes: {
        objectToShare: PropTypes.object.isRequired,
    },

    mixins: [Translate],

    render() {
        const sharingDialogActions = [
            <FlatButton
                label={this.getTranslation('close')}
                onClick={this.closeSharingDialog} />,
        ];

        return (
            <Dialog
                ref="sharingDialog"
                title={this.getTranslation('sharing_settings')}
                actions={sharingDialogActions}
                autoDetectWindowHeight
                autoScrollBodyContent
                {...this.props}
                >
                <Sharing objectToShare={this.props.objectToShare} />
            </Dialog>
        );
    },

    closeSharingDialog() {
        this.refs.sharingDialog.dismiss();
    },
});
