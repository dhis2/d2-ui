import React, { Component, Fragment } from 'react';
import {
    FormControl,
    InputLabel,
    List,
    Select,
    MenuItem,
    ListItem,
    ListItemText
} from 'material-ui';
import { Stop as StopIcon } from 'material-ui-icons';
import RelativePeriodsGenerator from './utils/RelativePeriodsGenerator';

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
        </Fragment>;
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
                            <StopIcon/>
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
