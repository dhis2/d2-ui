import React, { Component, Fragment } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';

class PeriodSelectorExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPeriods: [],
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

    selectPeriods = (selectedPeriods) => {
        this.setState({
            selectedPeriods: [
                ...this.state.selectedPeriods,
                ...selectedPeriods,
            ],
        });
    };

    deselectPeriods = (removedPeriods) => {
        const removedPeriodsIds = removedPeriods.map(period => period.id);
        const selectedPeriods = this.state
            .selectedPeriods
            .filter(period => !removedPeriodsIds.includes(period.id));

        this.setState({ selectedPeriods });
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Fragment>
                    <PeriodSelector
                        d2={this.props.d2}
                        onSelect={this.selectPeriods}
                        onDeselect={this.deselectPeriods}
                        selectedItems={this.state.selectedPeriods}
                    />
                    <Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={4000}
                        onClose={this.onSnackbarClose}
                    />
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

PeriodSelectorExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

export default PeriodSelectorExample;
