import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';

import i18n from '@dhis2/d2-i18n';
import { getFileTypeLabel } from './util';

class SaveAsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            newDescription: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // reset form to initial value when reopening the save as dialog
        if (nextProps.open === true && !this.state.newName) {
            this.setState({
                newName: nextProps.fileModel.displayName || '',
                newDescription: nextProps.fileModel.displayDescription || '',
            });
        }
    }

    onRequestClose = () => {
        // reset form so when the dialog is reopened is consistent
        // with the actual favorite
        this.setState({ newName: '', newDescription: '' });

        this.props.onRequestClose();
    };

    handleChange = field => (event) => {
        event.preventDefault();

        this.setState({
            [field]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.props.onRequestSaveAs) {
            this.props.onRequestSaveAs(this.state);
        }
    };

    render() {
        const { open, fileType } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle>{i18n.t('Save {{what}} as', { what: getFileTypeLabel(fileType) })}</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Name')}
                                value={this.state.newName}
                                required
                                margin="normal"
                                onChange={this.handleChange('newName')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Description')}
                                value={this.state.newDescription}
                                margin="normal"
                                multiline
                                rowsMax={4}
                                onChange={this.handleChange('newDescription')}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onRequestClose} color="primary">
                            {i18n.t('Cancel')}
                        </Button>
                        <Button type="submit" onClick={this.handleSubmit} color="primary">
                            {i18n.t('Save')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

SaveAsDialog.contextTypes = {
    d2: PropTypes.object,
};

SaveAsDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestSaveAs: null,
};

SaveAsDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestSaveAs: PropTypes.func,
};

export default SaveAsDialog;
