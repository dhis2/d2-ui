import React, { Component } from 'react';
import RelativePeriodsGenerator from './utils/RelativePeriodsGenerator';
import { FormControl, InputLabel, List, Select, MenuItem, ListItem, ListItemText } from 'material-ui-next';

export const defaultState = {
    periodType: '',
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
        });

        this.props.setOfferedPeriods(this.generatePeriods(event.target.value));
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
            <List component="nav" className="periods-list">
                {this.props.periods.map((period, index) => {
                    return <ListItem onClick={() => this.props.onPeriodClick(period, index)}
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

export default RelativePeriods;
