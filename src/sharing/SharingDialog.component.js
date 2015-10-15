// import {config} from 'd2/lib/d2';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Sharing from './Sharing.component';

export default createClass({
    propTypes: {
        objectToShare: PropTypes.object.isRequired,
    },

    mixins: [Translate],

    render() {
        const sharingDialogActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.closeSharingDialog} />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.closeSharingDialog} />,
        ];

        return (
            <Dialog
                ref="sharingDialog"
                title={this.getTranslation('sharing_settings')}
                actions={sharingDialogActions}
                modal
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
