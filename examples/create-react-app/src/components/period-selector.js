import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';

class PeriodSelectorExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbar: {
                open: false,
                message: '',
            },
        };
    }

    onSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    onPeriodsSelect = (periods) => {
        this.setState({
            ...this.state,
            snackbar: {
                open: true,
                message: `Selected periods: ${periods.map(period => period.name).join(', ')}`,
            },
        });
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <PeriodSelector
                    onPeriodsSelect={this.onPeriodsSelect}
                    d2={this.props.d2}
                />
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onClose={this.onSnackbarClose}
                />
            </MuiThemeProvider>
        );
    }
}

PeriodSelectorExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

export default PeriodSelectorExample;
