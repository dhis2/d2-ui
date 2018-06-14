import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button } from '@dhis2/d2-ui-core';
import TextField from 'material-ui/TextField';
import i18n from '@dhis2/d2-i18n'

const styles = {
    dialog: {
        maxWidth: 600,
    },
    textfield: {
        width: '100%',
    },
};

class InterpretationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.interpretation ? props.interpretation.text : "" };
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

    render() {
        const { interpretation, onSave } = this.props;
        const { value } = this.state;
        const title = interpretation && interpretation.id
            ? i18n.t('Edit interpretation')
            : i18n.t('Create interpretation');

        return (
            <Dialog
                title={title}
                open={true}
                onRequestClose={this.cancel}
                actions={[
                    <Button color="primary" onClick={this.cancel}>
                        {i18n.t('Cancel')}
                    </Button>,
                    <Button
                        color="primary"
                        disabled={value ? false : true}
                        onClick={this.save}
                    >
                        {i18n.t('Save')}
                    </Button>,
                ]}
                contentStyle={styles.dialog}
            >
                <TextField
                    name="interpretation"
                    value={value}
                    multiLine={true}
                    rows={1}
                    onChange={(evt, value) => this.setState({ value })}
                    style={styles.textfield}
                />
            </Dialog>
        );
    }
}

InterpretationDialog.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default InterpretationDialog;
