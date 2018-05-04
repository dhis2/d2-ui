import React, { Component } from 'react';
import RelativePeriodsGenerator from './RelativePeriodsGenerator';
import { FormControl, InputLabel, List, Select, MenuItem, ListItem, ListItemText } from 'material-ui-next';

export const defaultState = {
    periodType: '',
    periods: []
};

class RelativePeriods extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.periodsGenerator = new RelativePeriodsGenerator();
    }

    generatePeriods = (periodType) => {
        const generator = this.periodsGenerator.get(periodType);

        return generator.generatePeriods();
    };

    onPeriodTypeChange = (event) => {
        this.setState({
            periodType: event.target.value,
            periods: this.generatePeriods(event.target.value),
        });
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
        </div>;
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

export default RelativePeriods;
