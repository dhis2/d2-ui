import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button } from '@dhis2/d2-ui-core';
import defer from 'lodash/fp/defer';
import i18n from '@dhis2/d2-i18n'
import { compact } from 'lodash/fp';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import RichEditor from '../html-editor/RichEditor';

const styles = {
    dialog: {
        maxWidth: 600,
        height: 500,
    },
};

class InterpretationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.interpretation.text,
            showEditor: true,
            sharingDialogIsOpen: false,
            savedInterpretation: null,
        };
        this.save = this.hideEditorAndThen(this._save.bind(this));
        this.saveAndShare = this.hideEditorAndThen(this._saveAndShare.bind(this));
        this.cancel = this.hideEditorAndThen(this._cancel.bind(this));
    }

    hideEditorAndThen(fn) {
        // Method componentWillUnmount of child components of Dialog are called *after* their nodes
        // are removed from the DOM (bug in mui?), which triggers errors in CKEditor.destroy.
        // Workaround: Manually unmount the component using a flag in state.
        return (...args) =>
            this.setState({ showEditor: false }, () => defer(() => fn(...args)));
    }

    _cancel() {
        this.props.onClose();
    }

    _save() {
        const { interpretation, onSave } = this.props;
        const { value } = this.state;
        interpretation.text = value;
        return interpretation.save().then(() => {
            onSave(interpretation);
            return interpretation;
        });
    }

    onChange = (newValue) => { this.setState({ value: newValue }); }

    _saveAndShare = () => {
        this._save().then(savedInterpretation =>
            this.setState({ savedInterpretation, sharingDialogIsOpen: true }));
    }

    render() {
        const { d2 } = this.context;
        const { interpretation, mentions } = this.props;
        const { value, showEditor, sharingDialogIsOpen, savedInterpretation } = this.state;
        const isActionEdit = !!interpretation.id;
        const title = isActionEdit
            ? i18n.t('Edit interpretation')
            : i18n.t('Create interpretation');
        const buttonProps = {color: "primary", disabled: !value};
        const actions = compact([
            <Button color="primary" onClick={this.cancel}>{i18n.t('Cancel')}</Button>,
            isActionEdit
                ? <Button {...buttonProps} onClick={this.save}>{i18n.t('Save')}</Button>
                : <Button {...buttonProps} onClick={this.saveAndShare}>{i18n.t('Save & share')}</Button>,
        ]);

        if (sharingDialogIsOpen) {
            return (
                <SharingDialog
                    open={true}
                    onRequestClose={this.cancel}
                    d2={d2}
                    id={savedInterpretation.id}
                    type={"interpretation"}
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
                    {showEditor &&
                        <RichEditor
                            options={{height: 150}}
                            initialContent={value}
                            onEditorChange={this.onChange}
                            mentions={mentions}
                        />
                    }
                </Dialog>
            );
        }
    }
}

InterpretationDialog.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    mentions: RichEditor.propTypes.mentions,
};

InterpretationDialog.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default InterpretationDialog;
