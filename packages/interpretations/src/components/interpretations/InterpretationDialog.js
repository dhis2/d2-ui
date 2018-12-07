import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';

class InterpretationDialog extends Component {
    state = {
        value: this.props.interpretation.text,
        sharingDialogIsOpen: false,
        savedInterpretation: null,
    };

    _saveInterpretation() {
        const { interpretation } = this.props;
        const { value } = this.state;
        interpretation.text = value;
        return interpretation.save();
    }

    cancel = () => {
        this.props.onClose();
    };

    onChange = event => {
        this.setState({ value: event.target.value });
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
                    open={true}
                    onClose={this.cancel}
                    maxWidth="md"
                >
                    <DialogTitle>{title}</DialogTitle>

                    <DialogContent>
                        <MentionsWrapper d2={d2} onUserSelect={this.onChange}>
                            <FormControl fullWidth>
                                <TextField
                                    name="interpretation"
                                    value={value}
                                    margin="normal"
                                    multiline={true}
                                    rowsMax={4}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                        </MentionsWrapper>
                    </DialogContent>

                    <DialogActions>
                        <Button color="primary" onClick={this.cancel}>
                            {i18n.t('Cancel')}
                        </Button>

                        {!isActionEdit && (
                            <Button {...buttonProps} onClick={this.saveAndShare}>
                                {i18n.t('Save & share')}
                            </Button>
                        )}

                        <Button {...buttonProps} onClick={this.save}>
                            {i18n.t('Save')}
                        </Button>
                    </DialogActions>
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
