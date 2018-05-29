import React, { Component, Fragment } from 'react';
import FixedPeriodsGenerator from './utils/FixedPeriodsGenerator';
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    List,
    ListItem,
    ListItemText
} from 'material-ui';

export const defaultState = {
    periodType: '',
    year: (new Date()).getFullYear(),
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
        this.setState({
            periodType: event.target.value
        });

        if (this.state.year) {
            this.props.setOfferedPeriods(this.generatePeriods(event.target.value, this.state.year));
        }
    };

    onYearChange = (event) => {
        this.setState({
            year: event.target.value,
        });

        if (this.state.periodType) {
            this.props.setOfferedPeriods(this.generatePeriods(this.state.periodType, event.target.value));
        }
    };

    renderOptions = () => {
        return <Fragment>
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
        </Fragment>
    };

    render() {
        return <div className="selector-area">
            {this.renderOptions()}
            <List component="nav" className="periods-list">
                {this.props.periods.map((period, index) => {
                    return <ListItem onClick={(event) => this.props.onPeriodClick(period, index, event.shiftKey)}
                                     className={"period-li " + (period.selected === true ? 'selected' : '')}
                                     key={period.id}
                                     button
                    >
                        <ListItemText>
                            <i className="material-icons list-icon">stop</i>
                            <span className="list-text">{period.name}</span>
                        </ListItemText>
                    </ListItem>
                })}
            </List>
        </div>
    }
}

export default FixedPeriods;
