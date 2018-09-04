import React, { Component, Fragment } from 'react';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FixedPeriodsGenerator from './utils/FixedPeriodsGenerator';
import PeriodsList from './PeriodsList';
import PropTypes from 'prop-types';

export const defaultState = {
    periodType: '',
    year: (new Date()).getFullYear(),
};

class FixedPeriods extends Component {
    constructor(props, context) {
        super(props);

        this.periodsGenerator = new FixedPeriodsGenerator();
        this.i18n = context.d2.i18n;
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
                <InputLabel htmlFor="period-type">
                    {this.i18n.getTranslation('Period type')}
                </InputLabel>
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
                <InputLabel htmlFor="year">
                    {this.i18n.getTranslation('Year')}
                </InputLabel>
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
            <PeriodsList periods={this.props.periods} onPeriodClick={this.props.onPeriodClick}/>
        </div>
    }
}

FixedPeriods.contextTypes = {
    d2: PropTypes.object
};

export default FixedPeriods;
