import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button } from '@dhis2/d2-ui-core';
import defer from 'lodash/fp/defer';
import i18n from '@dhis2/d2-i18n'
import { compact } from 'lodash/fp';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import TextField from 'material-ui/TextField';

const styles = {
    dialog: {
        maxWidth: 600,
        height: 500,
    },
    textfield: {
        width: '100%',
    },
};

class InterpretationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.interpretation.text,
            sharingDialogIsOpen: false,
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        this.props.onClose();
    }

    save() {
        const { interpretation, onSave } = this.props;
        const { value } = this.state;
        interpretation.text = value;
        onSave(interpretation);
    }

    onChange = (ev, newValue) => { this.setState({ value: newValue }); }

    openSharingDialog = () => { this.setState({ sharingDialogIsOpen: true }); }

    closeSharingDialog = () => { this.setState({ sharingDialogIsOpen: false }); }

    render() {
        const { d2 } = this.context;
        const { interpretation } = this.props;
        const { value, sharingDialogIsOpen } = this.state;
        const renderSharingDialog = interpretation && interpretation.id;
        const title = interpretation && interpretation.id
            ? i18n.t('Edit interpretation')
            : i18n.t('Create interpretation');
        const actions = compact([
            <Button color="primary" onClick={this.cancel}>{i18n.t('Cancel')}</Button>,
            interpretation.id
                ? <Button color="primary" onClick={this.openSharingDialog}>{i18n.t('Share')}</Button>
                : null,
            <Button color="primary" disabled={!value} onClick={this.save}>{i18n.t('Save')}</Button>,
        ]);

        return (
            <Dialog
                title={title}
                open={true}
                onRequestClose={this.cancel}
                actions={actions}
                contentStyle={styles.dialog}
                repositionOnUpdate={false}
            >
                <TextField
                    name="interpretation"
                    value={value}
                    multiLine={true}
                    rows={1}
                    onChange={this.onChange}
                    style={styles.textfield}
                />

                {renderSharingDialog &&
                    <SharingDialog
                        open={sharingDialogIsOpen}
                        onRequestClose={this.closeSharingDialog}
                        d2={d2}
                        id={interpretation.id}
                        type={"interpretation"}
                    />
                }
            </Dialog>
        );
    }
}

InterpretationDialog.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

InterpretationDialog.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default InterpretationDialog;
