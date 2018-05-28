import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui-next/Snackbar';

import PeriodSelectorDialog from '@dhis2/d2-ui-period-selector-dialog';

export default class PeriodSelectorDialogExample extends Component {
    state = {
        dialogOpened: false,
        snackbar: {
            open: false,
            message: '',
        },
    };

    toggleDialog = () => {
        this.setState({
            dialogOpened: !this.state.dialogOpened,
        });
    };

    onPeriodSelect = (periods) => {
        this.setState({
            dialogOpened: !this.state.dialogOpened,
            snackbar: {
                open: true,
                message: `Selected periods: ${periods.map(period => period.id).join(', ')}`,
            },
        });
    };

    onSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <div style={{padding: 16}}>
                    <RaisedButton onClick={this.toggleDialog} label="Select periods"/>
                </div>
                <PeriodSelectorDialog
                    open={this.state.dialogOpened}
                    onClose={this.toggleDialog}
                    onUpdate={this.onPeriodSelect}
                />
                <Snackbar open={this.state.snackbar.open}
                          message={this.state.snackbar.message}
                          autoHideDuration={4000}
                          onClose={this.onSnackbarClose}
                />
            </div>
        </MuiThemeProvider>
    );
};
