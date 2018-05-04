import React, { Component } from 'react';
import FixedPeriodsGenerator from './FixedPeriodsGenerator';
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    List,
    ListItem,
    ListItemText
} from 'material-ui-next';

export const defaultState = {
    periodType: '',
    year: (new Date()).getFullYear(),
    periods: []
};

class FixedPeriods extends Component {
    constructor(props) {
        super(props);

        this.periodsGenerator = new FixedPeriodsGenerator();
        this.years = this.getYears();
        this.state = defaultState;
    }

    getYears = () => {
        let years = [];
        years = years.concat([0, 1, 2, 3, 4].map(offset => (new Date).getFullYear() - offset));
        years = years.concat([1, 2, 3, 4].map(offset => (new Date).getFullYear() + offset));

        return years;
    };

    generatePeriods = (periodType, year) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods({
            offset: year - (new Date).getFullYear(),
            filterFuturePeriods: false,
            reversePeriods: false
        });
    };

    onPeriodTypeChange = (event) => {
        const state = { periodType: event.target.value };

        if (this.state.year) {
            state.periods = this.generatePeriods(state.periodType, this.state.year);
        }

        this.setState(state);
    };

    onYearChange = (event) => {
        const state = { year: event.target.value };

        if (this.state.periodType) {
            state.periods = this.generatePeriods(this.state.periodType, state.year);
        }

        this.setState(state);
    };

    renderOptions = () => {
        return <div>
            <FormControl className="form-control period-type">
                <InputLabel htmlFor="period-type">Period type</InputLabel>
                <Select
                    onChange={this.onPeriodTypeChange}
                    value={this.state.periodType}
                    inputProps={{ name: 'periodType', id: 'period-type' }}
                >
                    {this.periodsGenerator.getOptions().map((option, i) => {
                        return <MenuItem value={option} key={i}>{option}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl className="form-control year">
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                    onChange={this.onYearChange}
                    value={this.state.year}
                    inputProps={{ name: 'year', id: 'year' }}
                >
                    {this.years.sort().map((year, i) => {
                        return <MenuItem value={year} key={i}>{year}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    };

    render() {
        return <div className="selector-area">
            {this.renderOptions()}
            <List component="nav">
                {this.state.periods.map(period => {
                    return <ListItem key={period.id}>
                        <ListItemText>{period.name}</ListItemText>
                    </ListItem>
                })}
            </List>
        </div>
    }
}

export default FixedPeriods;
