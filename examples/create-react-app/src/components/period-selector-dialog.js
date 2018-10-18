import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import PeriodSelectorDialog from '@dhis2/d2-ui-period-selector-dialog';

class PeriodSelectorDialogExample extends Component {
    state = {
        // example of initially selected periods
        selectedPeriods: [
            { id: 'TODAY', name: 'Today' },
            { id: 'YESTERDAY', name: 'Yesterday' },
            { id: 'LAST_3_DAYS', name: 'Last 3 days' },
        ],
        dialogOpened: false,
        snackbar: {
            open: false,
            message: '',
        },
    };

    onSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    onUpdate = (selectedPeriods) => {
        this.setState({
            selectedPeriods,
            dialogOpened: false,
            snackbar: {
                open: true,
                message: `Selected periods: ${selectedPeriods.map(period => period.id).join(', ')}`,
            },
        });
    };

    onClose = () => {
        this.setState({
            dialogOpened: false,
            snackbar: {
                open: true,
                message: `Selected periods: ${this.state.selectedPeriods.map(period => period.id).join(', ')}`,
            },
        });
    };

    toggleDialog = () => {
        this.setState({
            dialogOpened: !this.state.dialogOpened,
        });
    };

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <div style={{ padding: 16 }}>
                    <RaisedButton
                        onClick={this.toggleDialog}
                        label="Select periods"
                    />
                </div>
                <PeriodSelectorDialog
                    d2={this.props.d2}
                    open={this.state.dialogOpened}
                    onClose={this.onClose}
                    onUpdate={this.onUpdate}
                    selectedItems={this.state.selectedPeriods}
                />
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onClose={this.onSnackbarClose}
                />
            </div>
        </MuiThemeProvider>
    );
}

PeriodSelectorDialogExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

export default PeriodSelectorDialogExample;
