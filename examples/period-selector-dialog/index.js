import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import log from 'loglevel';

import d2Lib from 'd2/lib/d2';
import PeriodSelectorDialog from '../../src/period-selector-dialog/PeriodSelectorDialog';
import PropTypes from "prop-types";

class PeriodSelectorDialogExample extends Component {
    state = {
        dialogOpened: false,
    };

    toggleDialog = () => {
        this.setState({
            dialogOpened: !this.state.dialogOpened,
        });
    };

    onPeriodSelect = (periods) => {
        console.log(periods);
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
                    onPeriodSelect={this.onPeriodSelect}
                />
            </div>
        </MuiThemeProvider>
    );
}

PeriodSelectorDialog.childContextTypes = {
    d2: PropTypes.object,
};

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

d2Lib.config.baseUrl = baseUrl;
d2Lib
    .init({ baseUrl })
    .then(() => {
        render(<PeriodSelectorDialogExample/>, el);
    })
    .catch(error => {
        log.error('Failed to initialize d2', error);
        render(<div>Failed to initialize d2: {error}</div>, el);
    });
