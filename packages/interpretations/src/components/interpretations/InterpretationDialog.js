import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button } from '@dhis2/d2-ui-core';
import defer from 'lodash/fp/defer';
import i18n from '@dhis2/d2-i18n';
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
    state = {
        value: this.props.interpretation.text,
        sharingDialogIsOpen: false,
        savedInterpretation: null,
    };

    _saveInterpretation() {
        const { interpretation, onSave } = this.props;
        const { value } = this.state;
        interpretation.text = value;
        return interpretation.save();
    }

    cancel = () => {
        this.props.onClose();
    };

    onChange = (ev, newValue) => {
        this.setState({ value: newValue });
    };

    save = () => {
        return this._saveInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.props.onClose();
        });
    };

    saveAndShare = () => {
        return this._saveInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.setState({ savedInterpretation, sharingDialogIsOpen: true });
        });
    };

    render() {
        const { d2 } = this.context;
        const { interpretation } = this.props;
        const { value, sharingDialogIsOpen, savedInterpretation } = this.state;
        const isActionEdit = !!interpretation.id;
        const title = isActionEdit
            ? i18n.t('Edit interpretation')
            : i18n.t('Create interpretation');
        const buttonProps = { color: 'primary', disabled: !value };
        const actions = compact([
            <Button color="primary" onClick={this.cancel}>
                {i18n.t('Cancel')}
            </Button>,
            !isActionEdit && (
                <Button {...buttonProps} onClick={this.saveAndShare}>
                    {i18n.t('Save & share')}
                </Button>
            ),
            <Button {...buttonProps} onClick={this.save}>
                {i18n.t('Save')}
            </Button>,
        ]);

        if (sharingDialogIsOpen) {
            return (
                <SharingDialog
                    open={true}
                    onRequestClose={this.cancel}
                    d2={d2}
                    id={savedInterpretation.id}
                    type={'interpretation'}
                />
            );
        } else {
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
                </Dialog>
            );
        }
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
