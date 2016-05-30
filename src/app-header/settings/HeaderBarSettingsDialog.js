import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import HeaderBarSettings from './HeaderBarSettings';
import noop from 'd2-utilizr/lib/noop';

export default function HeaderBarSettingsDialog(props) {
    return (
        <Dialog
            open={props.open}
            modal={false}
            onRequestClose={props.onRequestClose}
            actions={<FlatButton onClick={props.onRequestClose}>Close</FlatButton>}
        >
            <HeaderBarSettings />
        </Dialog>
    );
}
HeaderBarSettingsDialog.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
};
HeaderBarSettingsDialog.defaultProps = {
    open: false,
    onRequestClose: noop,
};
