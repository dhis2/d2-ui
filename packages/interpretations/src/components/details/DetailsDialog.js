import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Button } from '@dhis2/d2-ui-core';
import TextField from 'material-ui/TextField';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('edit_details');
config.i18n.strings.add('cancel');
config.i18n.strings.add('save');
config.i18n.strings.add('name');
config.i18n.strings.add('description');

const styles = {
    dialog: {
        maxWidth: 600,
    },
    textfield: {
        width: '100%',
    },
};

class DetailsDialog extends Component {
    constructor(props) {
        super(props);
        const { name, description } = props.model;
        this.state = { name, description };
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { name, description } = nextProps.model;
        this.setState({ name, description });
    }

    onSave() {
        const newModel = this.props.model;
        Object.assign(newModel, this.state);
        this.props.onSave(newModel);
    }

    render() {
        const { d2 } = this.context;
        const { open, model, onClose } = this.props;
        const { name, description } = this.state;

        if (!open)
            return null;

        const actions = [
            <Button color="primary" onClick={onClose}>
                {d2.i18n.getTranslation('cancel')}
            </Button>,

            <Button color="primary" disabled={false} onClick={this.onSave}>
                {d2.i18n.getTranslation('save')}
            </Button>,
        ];

        return (
            <Dialog
                title={d2.i18n.getTranslation('edit_details')}
                open={true}
                onRequestClose={onClose}
                actions={actions}
                contentStyle={styles.dialog}
                className="details-dialog"
            >
                <TextField
                    name="name"
                    value={name}
                    floatingLabelText={d2.i18n.getTranslation('name')}
                    onChange={(evt, name) => this.setState({ name })}
                    style={styles.textfield}
                />

                <TextField
                    name="description"
                    value={description}
                    floatingLabelText={d2.i18n.getTranslation('description')}
                    multiLine={true}
                    rows={1}
                    onChange={(evt, description) => this.setState({ description })}
                    style={styles.textfield}
                />
            </Dialog>
        );
    }
}

DetailsDialog.propTypes = {
    open: PropTypes.bool,
    model: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

DetailsDialog.defaultProps = {
    open: false,
};

DetailsDialog.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default DetailsDialog;
