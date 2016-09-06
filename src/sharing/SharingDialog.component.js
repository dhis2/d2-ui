import { config } from 'd2/lib/d2';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import React, { PropTypes, createClass } from 'react';
import Translate from '../i18n/Translate.mixin';
import Sharing from './Sharing.component';
import sharingStore from './sharing.store';

config.i18n.strings.add('close');
config.i18n.strings.add('sharing_settings');

export default createClass({
    propTypes: {
        objectToShare: PropTypes.object.isRequired,
        onRequestClose: PropTypes.func.isRequired,
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
                title={this.getTranslation('sharing_settings')}
                actions={sharingDialogActions}
                autoDetectWindowHeight
                autoScrollBodyContent
                {...this.props}
                onRequestClose={this.closeSharingDialog}
            >
                <Sharing objectToShare={this.props.objectToShare} />
            </Dialog>
        );
    },

    closeSharingDialog() {
        this.props.onRequestClose(sharingStore.getState());
    },
});
